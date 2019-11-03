const getIndexFromColumnName = require("./converter").getIndexFromColumnName;
const getColumnNameFromIndex = require("./converter").getColumnNameFromIndex;

test("test - throw error", () => {
   let args = [null, "", undefined, 1, [], ()=> {}, {}, NaN, false];
   args.forEach(el => {
      expect(() => getIndexFromColumnName(el)).toThrow(Error);
   });
});

test("test - get index from column name", () => {
      let matrix = [
         { arg: "A", expected: 0 },
         { arg: "AA", expected: 26 },
         { arg: "AB", expected: 27 }
      ];
      matrix.forEach((el) => {
         expect(getIndexFromColumnName(el.arg)).toBe(el.expected);
      });
});

test("test - invalid strings", () => {
   expect(() => getIndexFromColumnName("fa")).toThrow(Error);
   expect(() => getIndexFromColumnName("a")).toThrow(Error);
   expect(() => getIndexFromColumnName("a102")).toThrow(Error);
   expect(() => getIndexFromColumnName("A-B")).toThrow(Error);
});

test("test - get column name from index", () => {
   expect(getColumnNameFromIndex(0)).toBe("A");
   expect(getColumnNameFromIndex(1)).toBe("B");
   expect(getColumnNameFromIndex(26)).toBe("AA");
});

test("test - invalid column indexes", () => {
   let arg = [-1, "a", {}, ()=>{}, false, [], -65];
   arg.forEach(el => {
      expect(() => getColumnNameFromIndex(el)).toThrow(Error);
   });
});