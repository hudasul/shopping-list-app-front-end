import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const ListForm = () => {
  const [formData, setFormData] = useState({ name: "", date: "" });
  const { listId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

   const getListData = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/shoppingList/${id}`);
      const list = response.data;
      const ListdDate = new Date(list.date).toISOString().split("T")[0];
      setFormData({ name: list.name, date: ListdDate});
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    if (listId) {
      getListData(listId);
    }
  }, [listId]);


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (listId) {
      await axios.put(`${baseUrl}/shoppingList/${listId}`, formData);
    } else {
      await axios.post(`${baseUrl}/shoppingList/new`, formData);
    }
    navigate("/");
  };

  return (
    <>
      <button onClick={() => navigate("/")}>All Shopping Lists</button>

      <form onSubmit={handleSubmit}>
        <h2>{listId ? "Update List" : "Add New List"}</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label htmlFor="date">Last Date to purchase: </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">{listId ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default ListForm;
