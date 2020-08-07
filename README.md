# Sqlite-key-value
A database key-value module in sqlite

# Setup
First, install `sqlite-key-value`.
- NPM: `npm i -s sqlite-key-value`
- Yarn: `yarn add sqlite-key-value`

After that, use Node's `require` function to load in the class.
```js
const Database = require("sqlite-key-value");
```
Lastly, construct the `Database` class to create a database.

## Options
There are different options for creating a database. Read them below. Every option is optional!
| Name        | Default       | Type          | Description                                               |
|-------------|---------------|---------------|-----------------------------------------------------------|
| Development | False         | Boolean       | See [development](development)                            |
| Cwd         | process.cwd() | Compleat path | The path to the folder, starting from the beginning       |
| Name        | Database      | String        | The name of the database, without the extention           |
| InMemory    | False         | Boolean       | Load the whole database in memory for faster access times |
```js
const path = require("path");
let db = new Database({
  development: true, // Easy editable JSON database!
  cwd: path.join(__dirname, "databases"), // Folder "databases" under current directory
  name: "main-db",
  inMemory: true // Not recommended for large databases
});
```

## Development
Sqlite databases aren't easy editable, even with an external program. That's why there is a development option. If true, `json-config-store` will be used for the database, so it's easy editable.

Don't use json databases for public applications, because JSON databases corrupt fast.

# Using the database
There are four methods. When using a JSON database (during development only!), you're using [json-config-store](https://www.npmjs.com/package/json-config-store).

All the methods return a promise that gets resolved when the operation is compleated

## WaitForReady
Returnes a promise that gets resolved when the database is ready!

## Get
To get data, use the `get` method, with one parameter: The key you want to get.

## Set
To set data, use the `set` method. It has two parameters:
- Key: The key
- Value: Everything that is compatible with `JSON.stringify`.

## Delete
To delete a key, use the `delete` method. Just like the `get` method, it has one parameter: The key you want to delete

## Example
```js 
db.waitForReady().then(async () => {
  await db.set("foo", "bar");
  console.log(await db.get("foo"));
  // > bar
  
  await db.delete("foo");
  console.log(await db.get("foo"));
  // > undefined
});
```