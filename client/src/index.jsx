import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import Create from "./components/Create.jsx";

const App = () => {
  const [items, setItems] = useState([]);

  const [refresh, setRrefresh] = useState(true);
  useEffect(() => {
    $.ajax({
      url: "http://127.0.0.1:3000/api/items",
      success: (data) => {
        console.log(data);
        setItems(data);
      },
      error: (err) => {
        console.log("Error fetching items:", err);
      },
    });
  }, [refresh]);
  const create = (dataa) => {
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/api/items",
      data: dataa,

      success: () => {
        console.log("Item added successfully");
        setRrefresh(!refresh);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  const update = (id, quantity, description) => {
    $.ajax({
      type: "PUT",
      url: `http://127.0.0.1:3000/api/items/${id}`,
      data: { quantity, description },
      success: () => {
        console.log("Item updated successfully");
        setRrefresh(!refresh);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  const delet = (id) => {
    $.ajax({
      type: "DELETE",
      url: ` http://127.0.0.1:3000/api/items/${id}`,

      success: () => {
        console.log("Item deleted successfully");
        setRrefresh(!refresh);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <div>
      <h1>Item List</h1>
      <Create create={create} />
      <List items={items} delet={delet} update={update} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
