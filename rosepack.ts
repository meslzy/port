import {defineRosepack} from "rosepack";

export default defineRosepack((config) => ({
  format: [
    "cjs",
    "esm",
    "dts",
  ],
  input: {
    main: "source/main.ts",
  },
}));