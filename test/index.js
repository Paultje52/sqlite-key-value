const Database = require("../");

let db = new Database({
  development: false,
  inMemory: true
});