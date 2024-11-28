import React from "react";
import ListItem from "./ListItem.jsx";

const List = ({ items, delet, update }) => {
  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} del={delet} update={update} />
      ))}
    </div>
  );
};

export default List;
