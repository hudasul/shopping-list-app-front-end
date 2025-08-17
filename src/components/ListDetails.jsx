import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ListDetails = (props) => {
  const [listItems, setListItems] = useState([]);
  const List = props.selectedList;
  const getShoppingListItems = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/shoppingList/${
      List._id
    }/item`;
    const response = await axios.get(url);
    setListItems(response.data);
  };

  useEffect(() => {
    getShoppingListItems();
  }, []);

  return (
    <>
      <h1>{List.name}</h1>
      <button onClick={props.handleAddItemButtonClick}>Add Item</button>
      {listItems ? (
        listItems.map((item) => {
          return (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button>Update</button>
              <button>Delete</button>
            </div>
          );
        })
      ) : (
        <h2>There is no items in this list</h2>
      )}
    </>
  );
};

export default ListDetails;
