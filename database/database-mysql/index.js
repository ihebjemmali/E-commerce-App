const mysql = require("mysql2");

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "ecommerce",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

const selectAll = (callback) => {
  const sql = "SELECT * FROM items";
  connection.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const addItem = (item, callback) => {
  const sql = "INSERT INTO items SET ?";
  connection.query(sql, item, callback);
};

const updateItem = (id, updatedItem, callback) => {
  const sql = "UPDATE items SET quantity = ?,  description = ?  WHERE id = ?";
  const values = [updatedItem.quantity, updatedItem.description, id];
  connection.query(sql, values, (err, results) => {
    callback(err, results);
  });
};

const removeItem = (id, callback) => {
  const sql = "DELETE FROM items WHERE id = ?";
  connection.query(sql, id, (err, results) => {
    callback(err, results);
  });
};

// Export the functions to use them elsewhere
module.exports = {
  selectAll,
  addItem,
  updateItem,
  removeItem,
};
