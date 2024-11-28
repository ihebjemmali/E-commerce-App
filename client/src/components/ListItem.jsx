import React, { useState } from "react";

const ListItem = ({ item, del, update }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  const handleUpdate = () => {
    update(item.id, quantity, description);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={handleUpdate}>Save</button>
      </div>

      <div>
        <h3>{item.description}</h3>
        <p>Quantity: {item.quantity}</p>
      </div>

      <button onClick={() => del(item.id)}>Delete</button>
    </div>
  );
};

export default ListItem;
