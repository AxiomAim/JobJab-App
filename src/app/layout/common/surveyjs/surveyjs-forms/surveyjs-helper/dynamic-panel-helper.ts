import { SurveyJSConstants } from "app/core/util/app-constants";

/**
 * Helper class for handling dynamic panel operations in SurveyJS forms
 * Contains all the logic for building hierarchy paths and detecting panel indices
 */
export class DynamicPanelHelper {

  /**
   * Detect the correct outer panel index when dealing with nested dynamic panels
   * This ensures audit logs show the correct panel where the user is working
   * Can handle multiple levels of nesting for any dynamic panel structure
   */
  static detectOuterPanelIndex(options: any): number {
    // If this is a direct change to a dynamic panel, return the panel index
    if (options.question.getType && options.question.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
      return options.panelIndex || 0;
    }
    
    // For nested panel changes, we need to find the outermost dynamic panel that contains this change
    // The key insight is to use the panel's actual position in the parent's visible panels
    let currentPanel = options.panel;
    let currentQuestion = options.question;
    
    // Traverse up the hierarchy to find the outermost dynamic panel
    while (currentPanel && currentPanel.parentQuestion) {
      const parentQuestion = currentPanel.parentQuestion;
      
      // If this is a dynamic panel, we've found our target
      if (parentQuestion.getType && parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        // Find the index of this panel within the parent dynamic panel
        if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
          const panelIndex = parentQuestion.visiblePanels.indexOf(currentPanel);
          return panelIndex >= 0 ? panelIndex : 0;
        }
        
        // Fallback: try to find by panel data matching
        const parentValue = parentQuestion.value;
        if (Array.isArray(parentValue)) {
          for (let i = 0; i < parentValue.length; i++) {
            const panelData = parentValue[i];
            if (panelData && panelData[currentQuestion.name]) {
              // Check if this panel contains the change by looking at the panel data
              const nestedPanelValue = panelData[currentQuestion.name];
              if (Array.isArray(nestedPanelValue)) {
                // If we have panelData from the event, try to match it
                if (options.panelData) {
                  for (let j = 0; j < nestedPanelValue.length; j++) {
                    if (JSON.stringify(nestedPanelValue[j]) === JSON.stringify(options.panelData)) {
                      return i;
                    }
                  }
                } else {
                  // If no panelData, use the panel's position in visiblePanels as fallback
                  if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
                    const panelIndex = parentQuestion.visiblePanels.indexOf(currentPanel);
                    if (panelIndex >= 0) {
                      return panelIndex;
                    }
                  }
                }
              }
            }
          }
        }
        
        // If we still can't find it, return 0 as fallback
        return 0;
      }
      
      // Move up to the next level
      currentPanel = parentQuestion.parent;
      currentQuestion = parentQuestion;
    }
    
    // If we couldn't find any dynamic panel, return 0 as fallback
    return 0;
  }

  /**
   * Build a complete hierarchy path for nested panels
   * Shows the full path: "Outer Panel Title - Panel X - Inner Panel Title - Panel Y"
   * Works with any dynamic panel structure, not just hardcoded names
   */
  static buildPanelHierarchyPath(panel: any, mainPanelIndex: number): string {
    const hierarchy: string[] = [];
    
    // Find the outermost dynamic panel (the one that contains the main change)
    let currentPanel = panel;
    let currentQuestion = panel.parentQuestion;
    let outermostDynamicPanel = null;
    let outermostPanelIndex = mainPanelIndex;
    
    // First, traverse up to find the outermost dynamic panel
    while (currentPanel && currentPanel.parentQuestion) {
      const parentQuestion = currentPanel.parentQuestion;
      
      if (parentQuestion.getType && parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        outermostDynamicPanel = parentQuestion;
        // Get the panel index within this outermost dynamic panel
        if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
          const panelIndex = parentQuestion.visiblePanels.indexOf(currentPanel);
          if (panelIndex >= 0) {
            outermostPanelIndex = panelIndex;
          }
        }
        break;
      }
      
      currentPanel = parentQuestion.parent;
      currentQuestion = parentQuestion;
    }
    
    // Start with the outermost dynamic panel
    if (outermostDynamicPanel) {
      const panelTitle = outermostDynamicPanel.title || outermostDynamicPanel.name;
      hierarchy.push(`${panelTitle} - Panel ${outermostPanelIndex + 1}`);
    }
    
    // Now find any nested dynamic panels within the outermost panel
    currentPanel = panel;
    currentQuestion = panel.parentQuestion;
    
    while (currentPanel && currentPanel.parentQuestion) {
      const parentQuestion = currentPanel.parentQuestion;
      
      // If this is a nested dynamic panel, find its index
      if (parentQuestion.getType && parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        // Find the index of this panel within the parent dynamic panel
        if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
          const nestedPanelIndex = parentQuestion.visiblePanels.indexOf(currentPanel);
          if (nestedPanelIndex >= 0) {
            const questionTitle = parentQuestion.title || parentQuestion.name;
            hierarchy.push(`${questionTitle} - Panel ${nestedPanelIndex + 1}`);
            break;
          }
        }
      }
      
      // Move up to the next level
      currentPanel = parentQuestion.parent;
      currentQuestion = parentQuestion;
    }
    
    // Join the hierarchy (outermost panel first, then nested panels)
    return hierarchy.join(' - ');
  }

  /**
   * Build complete dynamic panel hierarchy by combining collected hierarchy info
   * This method reconstructs the full path from outer to inner panels
   */
  static buildCompleteDynamicPanelHierarchy(options: any, dynamicPanelHierarchy: Map<string, any>): any {
    const hierarchy: any[] = [];
    const seenQuestionNames = new Set<string>();
    
    // Find the most recent outer panel change for this question
    let currentQuestion = options.question;
    let currentPanel = options.panel;
    
    // Traverse up to find all dynamic panel levels (excluding the immediate parent)
    while (currentPanel && currentPanel.parentQuestion) {
      const parentQuestion = currentPanel.parentQuestion;
      
      if (parentQuestion.getType && parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        // Only add if we haven't seen this question name before (prevents duplicates)
        if (!seenQuestionNames.has(parentQuestion.name)) {
          let panelIndex = -1;
          if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
            panelIndex = parentQuestion.visiblePanels.indexOf(currentPanel);
          }
          
          if (panelIndex >= 0) {
            const panelTitle = parentQuestion.title || parentQuestion.name;
            hierarchy.unshift({
              questionName: parentQuestion.name,
              panelIndex: panelIndex,
              panelTitle: panelTitle,
              level: hierarchy.length
            });
            seenQuestionNames.add(parentQuestion.name);
          }
        }
      }
      
      // Move up to the next level
      currentPanel = parentQuestion.parent;
      currentQuestion = parentQuestion;
    }
    
    // Add the current leaf control level (immediate parent of the control)
    if (options.panel && options.panel.parentQuestion) {
      const parentQuestion = options.panel.parentQuestion;
      if (parentQuestion.getType && parentQuestion.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        // Only add if this question name hasn't been seen yet
        if (!seenQuestionNames.has(parentQuestion.name)) {
          let panelIndex = -1;
          if (parentQuestion.visiblePanels && Array.isArray(parentQuestion.visiblePanels)) {
            panelIndex = parentQuestion.visiblePanels.indexOf(options.panel);
          }
          
          if (panelIndex >= 0) {
            hierarchy.push({
              questionName: parentQuestion.name,
              panelIndex: panelIndex,
              panelTitle: parentQuestion.title || parentQuestion.name,
              level: hierarchy.length,
              isLeafLevel: true
            });
            seenQuestionNames.add(parentQuestion.name);
          }
        }
      }
    }
    
    return hierarchy;
  }

  /**
   * Build hierarchy path string from complete hierarchy array
   * Converts the hierarchy array to a readable string format
   */
  static buildHierarchyPathFromCompleteHierarchy(completeHierarchy: any[]): string {
    if (!completeHierarchy || completeHierarchy.length === 0) {
      return 'Unknown Panel';
    }
    
    const hierarchyParts: string[] = [];
    
    // Build the hierarchy path from outer to inner
    completeHierarchy.forEach((level, index) => {
      if (level.panelTitle && level.panelIndex !== undefined) {
        const panelNumber = level.panelIndex + 1; // Convert to 1-based indexing
        hierarchyParts.push(`${level.panelTitle} - Panel ${panelNumber}`);
      }
    });
    
    return hierarchyParts.join(' - ');
  }

  /**
   * Mark a newly added dynamic panel row for audit suppression
   * This prevents audit dialogs from appearing for newly added rows
   */
  static markNewDynamicPanelRow(q: any, panel: any, newlyAddedRowIndexes: Map<string, Set<number>>, initialValues: Map<string, any>): void {
    try {
      if (q && typeof q.getType === 'function' && q.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC && panel) {
        const idx = q.visiblePanels ? q.visiblePanels.indexOf(panel) : -1;
        if (idx >= 0) {
          const initial = initialValues.get(q.name);
          const existedInitially = Array.isArray(initial) && initial[idx] !== undefined;
          if (!existedInitially) {
            if (!newlyAddedRowIndexes.has(q.name)) newlyAddedRowIndexes.set(q.name, new Set<number>());
            newlyAddedRowIndexes.get(q.name)!.add(idx);
            console.log('[DP-NewRow] marked new row', q.name, idx);
          }
        }
      }
    } catch {}
  }

  /**
   * Check if a panel is newly added and should skip audit dialogs
   * This prevents audit dialogs from appearing when removing newly added panels
   */
  static isNewlyAddedPanel(question: any, panelToRemove: any, newlyAddedRowIndexes: Map<string, Set<number>>): boolean {
    try {
      if (question && typeof question.getType === 'function' && question.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        const panelIndex = typeof panelToRemove === 'number' ? panelToRemove : question.panels.indexOf(panelToRemove);
        if (panelIndex >= 0) {
          const newRows = newlyAddedRowIndexes.get(question.name);
          return newRows && newRows.has(panelIndex);
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Remove a panel from the newly added tracking when it's deleted
   * This cleans up the tracking after a newly added panel is removed
   */
  static removeFromNewlyAddedTracking(question: any, panelToRemove: any, newlyAddedRowIndexes: Map<string, Set<number>>): void {
    try {
      if (question && typeof question.getType === 'function' && question.getType() === SurveyJSConstants.QUESTION_TYPES.PANEL_DYNAMIC) {
        const panelIndex = typeof panelToRemove === 'number' ? panelToRemove : question.panels.indexOf(panelToRemove);
        if (panelIndex >= 0) {
          const newRows = newlyAddedRowIndexes.get(question.name);
          if (newRows && newRows.has(panelIndex)) {
            newRows.delete(panelIndex);
            // Clean up empty sets
            if (newRows.size === 0) {
              newlyAddedRowIndexes.delete(question.name);
            }
          }
        }
      }
    } catch {}
  }
}
