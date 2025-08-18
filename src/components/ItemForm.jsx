import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const ItemForm = () => {
  const initialState = { name: "", price: "", quantity: "" };
  const [itemFormData, setItemFormData] = useState(initialState);
  const { listId, itemId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const getItemData = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/item/${id}`);
      setItemFormData(response.data);
    } catch (err) {
      console.log(err)
    }
  };

    useEffect(() => {
    if (itemId) {
      getItemData(itemId);
    }
  }, [itemId]);

  const handleChange = (event) => {
    setItemFormData({
      ...itemFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (itemId) {
      await axios.put(`${baseUrl}/item/${itemId}`, itemFormData);
    } else {
      await axios.post(`${baseUrl}/shoppingList/${listId}/item`, itemFormData);
    }
    navigate(`/list/${listId}`);
  };

  return (
    <>
      <button onClick={() => navigate(`/list/${listId}`)}>
        Shopping List Details
      </button>
      <form onSubmit={handleSubmit}>
        <h2>{itemId ? "Update Item" : "Add New Item"}</h2>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          value={itemFormData.name}
          onChange={handleChange}
        />
        <label htmlFor="price">price:</label>
        <input
          type="number"
          name="price"
          value={itemFormData.price}
          onChange={handleChange}
        />
        <label htmlFor="quantity">quantity:</label>
        <input
          type="number"
          name="quantity"
          value={itemFormData.quantity}
          onChange={handleChange}
        />

        <button type="submit">{itemId ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default ItemForm;
