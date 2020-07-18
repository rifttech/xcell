/**
 * Takes ALPHA-26 format number representation and converts to a 0-based base-10 index of column
 * eg A is 0, B is 1, Z is 25, AA is 26 and so on.
 * @param {string} colName is column name of excel spreadsheet
 * @returns {number} index of column
 */
export const getIndexFromColumnName = (colName) => {
    if (!colName || typeof(colName) !== "string") {
        throw new Error("Illegal argument, 'colName' must be a string with format [A-Z]+");
    }

    if (!/^[A-Z]+$/.test(colName)){
        throw new Error(`Invalid string argument '${colName}', column matches to [A-Z]+`);
    }

    let characterPosition = 0;
    let result = 0;
    for (let i = colName.length - 1; i >= 0; i--) {
        let character = colName.charAt(i);

        if (character === "$") { // Absolute reference marker
            if (i !== 0) {
                throw new Error("Bad col ref format '" + colName + "'");
            }
            break;
        }

        // Nice ^_^
        // Apache Poi uses a Character.getNumericValue() function (see javadoc).
        // We'll use as alternative parseInt(number, radix).
        // For example, parseInt("A", 36) = 10.
        // For A-Z we get a range ([10; 35] - 9) => [1; 25].
        let shift = Math.pow(26, characterPosition);
        result += (parseInt(character, 36) - 9 ) * shift;
        characterPosition++;
    }
    return result - 1;
};

/**
 * Takes a column index and converts it from 0-based base 10 to ALPHA-26 number format.
 * eg. 0 -> A, 25 -> Z, 26 -> AA
 * @param {number} colIndex index of column of spreadsheet(starts with 0)
 * @returns {string} a column letter representation of spreadsheet column
 */
export const getColumnNameFromIndex = (colIndex) => {

    if (typeof (colIndex) !== "number" || colIndex < 0){
        throw new Error(`Illegal argument, The 'colIndex = ${colIndex}' must be an integral number of range [0;+inf)`);
    }

    // Excel counts column A as the 1st column,
    // we treat it as the 0th one
    let excelColNum = colIndex + 1;
    let colRef = "";
    let colRemain = excelColNum;
    while(colRemain > 0) {
        let thisPart = colRemain % 26;
        if(thisPart === 0) { thisPart = 26; }
        colRemain = (colRemain - thisPart) / 26;
        // The letter A is at 65
        let colChar = String.fromCharCode(thisPart + 64);
        colRef = colChar + colRef;
    }
    return colRef;
};

