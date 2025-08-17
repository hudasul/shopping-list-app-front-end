import React from "react";
import { useState } from "react";
import axios from "axios";

const ItemForm = (props) => {
  const initialState = { name: "", price: "", quantity: "" };
  const [itemFormData, setItemFormData] = useState(
    props.updatedItem ? props.updatedItem : initialState
  );

  const handleChange = (event) => {
    setItemFormData({
      ...itemFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setItemFormIsShown(false);
    const ListID = props.selectedList._id;
    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;
    const url = props.updatedItem
      ? `${baseUrl}/item/${props.updatedItem._id}`
      : `${baseUrl}/shoppingList/${ListID}/item`;
    const method = props.updatedItem ? `put` : "post";
    const response = await axios[method](url, itemFormData);
    setItemFormData(response.data);
    props.addItemToList(itemFormData);
  };

  return (
    <>
      <h1> {props.updatedItem ? "update Item" : "Add an Item"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={itemFormData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          value={itemFormData.price}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={itemFormData.quantity}
          onChange={handleChange}
        />
        <br />
        <br />

        <button> {props.updatedItem ? "update" : "Add"}</button>
      </form>
    </>
  );
};

export default ItemForm;
