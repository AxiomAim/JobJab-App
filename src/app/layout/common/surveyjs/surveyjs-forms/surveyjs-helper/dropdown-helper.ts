import { SurveyJSConstants } from "app/core/util/app-constants";

export class DropdownHelper {

  /**
   * Unfocuses a dropdown element when its value changes
   * SurveyJS already provides focus when a value is selected, so we unfocus to improve UX
   */
  public static unfocusOnDropdownElement(question: any): void {
    try {
      if (!question || !question.name) return;

      // Find the dropdown element in the DOM - handle both regular and dynamic panel cases
      let dropdownContainer: Element | null = null;

      // First try to find by the question name directly
      dropdownContainer = document.querySelector(`[data-name="${question.name}"]`);

      // If not found, the question might be inside a dynamic panel
      if (!dropdownContainer && question.parentQuestion) {
        // Try to find the parent dynamic panel first
        const parentPanel = document.querySelector(`[data-name="${question.parentQuestion.name}"]`);
        if (parentPanel) {
          // Look for the specific question within the parent panel
          dropdownContainer = parentPanel.querySelector(`[data-name="${question.name}"]`);
        }
      }

      if (!dropdownContainer) {
        console.warn(`Could not find dropdown container for question: ${question.name}`);
        return;
      }

      // Look for different types of dropdown elements that SurveyJS might create
      let focusableElement: HTMLElement | null = null;

      // Try to find SurveyJS custom dropdown input first (most common case)
      const surveyDropdownInput = dropdownContainer.querySelector('input[role="combobox"], input[aria-haspopup="listbox"]');
      if (surveyDropdownInput) {
        focusableElement = surveyDropdownInput as HTMLElement;
      } else {
        // Fallback to native select element
        const nativeSelect = dropdownContainer.querySelector('select');
        if (nativeSelect) {
          focusableElement = nativeSelect as HTMLElement;
        } else {
          // Try to find any input element that might be the dropdown
          const anyInput = dropdownContainer.querySelector('input');
          if (anyInput) {
            focusableElement = anyInput as HTMLElement;
          }
        }
      }

      if (focusableElement) {
        // Focus and blur to make the dropdown update its UI
        focusableElement.focus();
        focusableElement.blur();
      } else {
        console.warn(`Could not find focusable element in dropdown container for question: ${question.name}`);
      }
    } catch (error) {
      console.warn('Failed to unfocus dropdown element:', error);
    }
  }

  /**
   * Focuses on a specific matrix dropdown cell when its value changes
   * Uses the change detection information to find the exact cell that changed
   */
  public static focusOnMatrixDropdownCell(question: any, change: any): void {
    try {
      if (!question || !question.name || !change) return;

      // Use the change information to find the specific cell that was modified
      const { rowKey, columnName } = change;
      
      if (!rowKey || !columnName) {
        console.warn('Missing row or column information for matrix dropdown focus');
        return;
      }

      // Check if the changed column is actually a dropdown column
      const columns = question.columns || [];
      const changedColumn = columns.find((col: any) => col.name === columnName);
      
      if (!changedColumn || changedColumn.cellType !== 'dropdown') {
        return;
      }

      // Find the matrix dropdown container in the DOM
      const matrixContainer = document.querySelector(`[data-name="${question.name}"]`);
      if (!matrixContainer) {
        return;
      }

      // Find the specific cell using the row and column information
      let focusableElement: HTMLElement | null = null;

      // Try to find by the unique ID pattern that SurveyJS creates
      const rows = question.rows || [];
      
      // Find the row index
      let rowIndex = -1;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let rowText = '';
        if (typeof row === 'string') {
          rowText = row;
        } else if (typeof row === 'object' && row !== null) {
          rowText = row.text || row.value || '';
        }
        
        if (rowText === rowKey) {
          rowIndex = i;
          break;
        }
      }

      // Find the column index
      let colIndex = -1;
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        if (column.name === columnName) {
          colIndex = i;
          break;
        }
      }

      if (rowIndex !== -1 && colIndex !== -1) {
        // Try to find by the generated ID pattern
        const expectedId = `${question.name}_row${rowIndex}_col${colIndex}`.replace(/\s+/g, '_').replace(/[^A-Za-z0-9_\-]/g, '_');
        const cellElement = document.getElementById(expectedId);
        
        if (cellElement) {
          // Found the cell by ID, now look for the dropdown input
          const dropdownInput = cellElement.querySelector('input[role="combobox"], input[aria-haspopup="listbox"]');
          if (dropdownInput) {
            focusableElement = dropdownInput as HTMLElement;
          }
        }
      }

      // If ID method failed, try to find by DOM structure
      if (!focusableElement) {
        // Find all table rows in the matrix
        const tableRows = matrixContainer.querySelectorAll('.sd-table__row, tr, [class*="row"]');
        
        for (let i = 0; i < tableRows.length; i++) {
          const row = tableRows[i];
          
          // Check if this row contains the rowKey text
          if (row.textContent && row.textContent.includes(rowKey)) {
            // Find all dropdown inputs in this row
            const dropdownInputs = row.querySelectorAll('.sd-dropdown.sd-input, .sd-dropdown.sd-dropdown--empty.sd-input, input[role="combobox"], input[aria-haspopup="listbox"]');
            
            // If we know the column index, use it; otherwise try to find by column name
            if (colIndex !== -1 && colIndex < dropdownInputs.length) {
              // Use the column index to get the right dropdown
              focusableElement = dropdownInputs[colIndex] as HTMLElement;
            } else {
              // Try to find by column name in the row
              for (let j = 0; j < dropdownInputs.length; j++) {
                const dropdownInput = dropdownInputs[j];
                // Look for the column name in the surrounding context
                const cellContainer = dropdownInput.closest('td, .sd-table__cell, [class*="cell"]');
                if (cellContainer && cellContainer.textContent && cellContainer.textContent.includes(columnName)) {
                  focusableElement = dropdownInput as HTMLElement;
                  console.log(`Found dropdown by column name "${columnName}" in cell ${j}`);
                  break;
                }
              }
            }
            
            if (focusableElement) break;
          }
        }
      }

      if (focusableElement) {
        // Focus and blur to make the dropdown update its UI
        focusableElement.focus();
        focusableElement.blur();
      } else {
        console.warn(`Could not find focusable element in matrix dropdown for question: ${question.name}, row: ${rowKey}, column: ${columnName}`);
      }
    } catch (error) {
      console.warn('Failed to focus matrix dropdown cell:', error);
    }
  }
}
