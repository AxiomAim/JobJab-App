export function getRowIndex(rowKey: string, matrixQuestion: any): number {
  const rows = (matrixQuestion && matrixQuestion.rows) || [];
  return rows.findIndex((row: any) => {
    if (typeof row === 'string') {
      return row === rowKey || row.trim() === String(rowKey).trim();
    } else if (typeof row === 'object' && row !== null) {
      const value = (row as any).value;
      const text = (row as any).text;
      return (
        value === rowKey ||
        text === rowKey ||
        (typeof value === 'string' && value.trim() === String(rowKey).trim()) ||
        (typeof text === 'string' && text.trim() === String(rowKey).trim())
      );
    }
    return false;
  });
}


