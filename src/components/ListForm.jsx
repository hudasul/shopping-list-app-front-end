import React from "react";
import { useState } from "react";
import axios from "axios";

const ListForm = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitted) return;
    setIsSubmitted(true);

    const url = `${import.meta.env.VITE_BACKEND_URL}/shoppingList/new`;
    const response = await axios.post(url, formData);

    if (response.status === 200 || response.status === 201) {
      props.setShoppingLists([...props.shoppingLists, response.data]);
      props.setFormIsShown(false);
      props.setAddList(false);
    }

    setIsSubmitted(false);
  };

  return (
    <>
      <h1>Add a new Shopping List</h1>

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

        <button>Add</button>
      </form>
    </>
  );
};

export default ListForm;
