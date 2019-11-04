# XCELL - ALPHA-26 format converter

[![npm version](https://badge.fury.io/js/%40rifttech%2Fxcell.svg)](https://badge.fury.io/js/%40rifttech%2Fxcell)

## How to use

### Install

`npm install @rifttech/xcell`

or...

`yarn add @rifttech/xcell`

### Example
Well, it's pretty straightforward.

```js
import {
    getIndexFromColumnName,
    getColumnNameFromIndex
} from "@rifttech/xcell";

console.log(getIndexFromColumnName("A")); // prints 0
console.log(getColumnNameFromIndex(0)); // prints A
```


