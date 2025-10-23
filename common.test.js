import { sortBookMarksByNewest } from "./common.js";
import assert from "node:assert";
import test from "node:test";

test("sort bookmarks by newest", () => {
  const input = [
    { timeCreated: "2025-10-21T13:37:23" },
    { timeCreated: "2025-10-21T13:40:30" },
  ];
  const result = sortBookMarksByNewest(input);
  const expected = [
    { timeCreated: "2025-10-21T13:40:30" },
    { timeCreated: "2025-10-21T13:37:23" },
  ];
  assert.deepEqual(result, expected);
});
