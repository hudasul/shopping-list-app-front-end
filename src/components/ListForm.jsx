import React from "react";
import { useState } from "react";
import axios from "axios";

const ListForm = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialState = {
    name: "",
    date: "",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState(
    props.updatedList
      ? { ...props.updatedList, date: formatDate(props.updatedList.date) }
      : initialState
  );

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitted) return;
    setIsSubmitted(true);

    const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/shoppingList`;
    const url = props.updatedList
      ? `${baseUrl}/${props.updatedList._id}`
      : `${baseUrl}/new`;

    const method = props.updatedList ? "put" : "post";
    const response = await axios[method](url, formData);

    if (response.status === 200 || response.status === 201) {
      if (props.updatedList) {
        const updatedLists = props.shoppingLists.map((list) =>
          list._id === response.data._id ? response.data : list
        );
        props.setShoppingLists(updatedLists);
      } else {
        props.setShoppingLists([...props.shoppingLists, response.data]);
      }

      props.setFormIsShown(false);
      props.setAddList(false);
    }

    setIsSubmitted(false);
  };

  return (
    <>
      <h1>{props.updatedList ? "Update List" : "Add a new Shopping List"}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="date">Last date to purchase: </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br />
        <br />

        <button>{props.updatedList ? "update" : "Add"}</button>
      </form>
    </>
  );
};

export default ListForm;
