module.exports = function solveSudoku(matrix) {
  let defAr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let possibleValues;
  let cellWithMinCountOfValues;
  let row, col, matrixCopy;

  function deepCopy(matrix) {
    let clone = [];
    for (let i = 0; i < matrix.length; i++) {
      clone.push(matrix[i].slice());
    }
    return clone;
  }

  function solve(matrix) {
        while(true) {
          cellWithMinCountOfValues = undefined;
          matrix.forEach((row, rowIndex) => {
            row.forEach((num, colIndex) => {
              if (num == 0) {
                possibleValues = defAr.slice();
                
                // Row
                for(let i = 0; i < 9; i++) {
                  if (possibleValues.indexOf(matrix[rowIndex][i]) != -1) {
                    possibleValues.splice(possibleValues.indexOf(matrix[rowIndex][i]), 1);
                  };
                }

                // Col
                for(let i = 0; i < 9; i++) {
                  if (possibleValues.indexOf(matrix[i][colIndex]) != -1) {
                    possibleValues.splice(possibleValues.indexOf(matrix[i][colIndex]), 1);
                  };
                }

                // 3x3
                let rowStart = 3 * (Math.floor(rowIndex / 3));
                let colStart = 3 * (Math.floor(colIndex / 3));
                for(let i = rowStart; i < rowStart + 3; i++) {
                  for(let j = colStart; j < colStart + 3; j++) {
                    if (possibleValues.indexOf(matrix[i][j]) != -1) {
                      possibleValues.splice(possibleValues.indexOf(matrix[i][j]), 1);
                    };
                  };
                };

                if (possibleValues.length == 0) {
                  return false;
                }

                if (possibleValues.length == 1) {
                  matrix[rowIndex][colIndex] = possibleValues[0];
                }

                if (!cellWithMinCountOfValues || possibleValues.length < cellWithMinCountOfValues[1].length) {
                  cellWithMinCountOfValues = [[rowIndex, colIndex], possibleValues];
                }
              }
            });
          });
          if (!cellWithMinCountOfValues) {
            return true;
          };
          if (cellWithMinCountOfValues[1].length > 1) {
            break;
          };
        };

        row = cellWithMinCountOfValues[0][0];
        col = cellWithMinCountOfValues[0][1];
        for (let i = 0; i < cellWithMinCountOfValues[1].length; i++) {
          matrixCopy = deepCopy(matrix);
          matrixCopy[row][col] = cellWithMinCountOfValues[1][i];

          if (solve(matrixCopy)) {
            for (let j = 0; j < matrixCopy.length; j++) {
              for (let k = 0; k < matrixCopy[0].length; k++) {
                matrix[j][k] = matrixCopy[j][k];
              }
            }
            return true;
          };
        }
        return false;
  };

  solve(matrix);
  return matrix;
}
