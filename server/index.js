const express = require("express");
const cors = require("cors");

const {
  selectAll,
  addItem,
  updateItem,
  removeItem,
} = require("../database/database-mysql");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use(cors());

app.get("/api/items", function (req, res) {
  selectAll((err, items) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(items);
    }
  });
});

app.post("/api/items", function (req, res) {
  const newItem = req.body;
  addItem(newItem, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ message: "Item added successfully" });
    }
  });
});

app.put("/api/items/:id", function (req, res) {
  const id = req.params.id;
  const { quantity, description } = req.body;
  updateItem(id, req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: "Item updated successfully" });
    }
  });
});

app.delete("/api/items/:id", function (req, res) {
  const id = req.params.id;
  removeItem(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ message: "Item removed successfully" });
    }
  });
});
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
});
