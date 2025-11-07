import { getRowIndex } from "./matrix-helper";

export function getBaseColumnName(columnName: string): string {
  if (typeof columnName !== "string") {
    return columnName as any;
  }
  return columnName.endsWith("-Comment")
    ? columnName.replace(/-Comment$/, "")
    : columnName;
}

export function buildCommentRadioName(
  matrixQuestionName: string,
  rowIndex: number,
  baseColumnName: string
): string {
  return `${matrixQuestionName}_row${rowIndex}_${baseColumnName}-Comment`;
}

export function applyMatrixCommentRevert(
  currentMatrix: any,
  prevRowData: any,
  rowKey: string,
  commentKey: string,
  commentRadioName: string,
  prevCommentValue: any
): any {
  const newMatrixValue = JSON.parse(JSON.stringify(currentMatrix));
  if (!newMatrixValue[rowKey]) {
    newMatrixValue[rowKey] = {};
  }
  newMatrixValue[rowKey][commentKey] = prevCommentValue;

  if (
    prevRowData &&
    Object.prototype.hasOwnProperty.call(prevRowData, commentRadioName)
  ) {
    newMatrixValue[rowKey][commentRadioName] = prevRowData[commentRadioName];
  } else {
    newMatrixValue[rowKey][commentRadioName] = prevCommentValue;
  }

  return newMatrixValue;
}

export function updateCellQuestionComment(
  cellQuestion: any,
  commentValue: any
): void {
  if (!cellQuestion) {
    return;
  }
  try {
    (cellQuestion as any).comment = commentValue;
    if (typeof (cellQuestion as any).render === "function") {
      (cellQuestion as any).render();
    }
  } catch {
    // noop; UI sync best-effort
  }
}

export function getCommentChangeInfo(options: any): {
  isCommentChange: boolean;
  targetKey: string;
} {
  const isCommentChange =
    typeof options?.name === "string" && options.name.endsWith("-Comment");
  const targetKey = isCommentChange ? options.name : options?.question?.name;
  return { isCommentChange, targetKey };
}

export function clearOrphanedMatrixComments(
  prevMatrix: any,
  currMatrix: any,
  questionName: string,
  surveyModel: any
): void {
  if (
    !prevMatrix ||
    !currMatrix ||
    typeof prevMatrix !== "object" ||
    typeof currMatrix !== "object"
  ) {
    return;
  }

  // Try to fetch the matrix question from the survey model for radio-name computation
  let matrixQuestion: any = undefined;
  try {
    matrixQuestion = surveyModel?.getQuestionByName?.(questionName);
  } catch {
    matrixQuestion = undefined;
  }

  for (const [rowKey, rowValue] of Object.entries(currMatrix)) {
    if (rowValue && typeof rowValue === "object" && !Array.isArray(rowValue)) {
      const prevRowValue = (prevMatrix as any)[rowKey as any];
      if (
        prevRowValue &&
        typeof prevRowValue === "object" &&
        !Array.isArray(prevRowValue)
      ) {
        for (const [colKey, colValue] of Object.entries(rowValue)) {
          if ((colKey as string).endsWith("-Comment")) {
            continue;
          }

          const prevColValue = (prevRowValue as any)[colKey as any];
          if (prevColValue === "other" && colValue !== "other") {
            const commentKey = `${colKey}-Comment`;
            if ((rowValue as any)[commentKey]) {
              delete (rowValue as any)[commentKey];
            }

            // Also clear the radio-styled comment key for this cell if we can compute it
            const rowIndex = getRowIndex(
              String(rowKey),
              matrixQuestion
            );
            if (rowIndex < 0) {
              console.warn(`Row index not found for rowKey "${rowKey}" in matrix "${questionName}"`);
              continue;
            }
            const commentRadioName = buildCommentRadioName(
              questionName,
              rowIndex,
              String(colKey)
            );
            if ((rowValue as any)[commentRadioName]) {
              delete (rowValue as any)[commentRadioName];
            }
            const currentMatrixValue = surveyModel.getValue(questionName);
            if (currentMatrixValue && currentMatrixValue[rowKey]) {
              delete currentMatrixValue[rowKey][commentKey];
              const rowIndex = getRowIndex(
                String(rowKey),
                matrixQuestion
              );
              if (rowIndex < 0) {
                console.warn(`Row index not found for rowKey "${rowKey}" in matrix "${questionName}"`);
                continue;
              }
              const commentRadioName = buildCommentRadioName(
                questionName,
                rowIndex,
                String(colKey)
              );
              if (
                currentMatrixValue[rowKey].hasOwnProperty(commentRadioName)
              ) {
                delete currentMatrixValue[rowKey][commentRadioName];
              }
            }
            surveyModel.setValue(questionName, currentMatrixValue);
          }
        }
      }
    }
  }
}
