import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import'./style/ItemForm.css'

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
    <div className="itemform-container">
      <button id="go-back-to-lists-btn" onClick={() => navigate(`/list/${listId}`)}>
        Shopping List Details
      </button>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <h2>{itemId ? "Update Item" : "Add New Item"}</h2>
       <input
          type="text"
          name="name"
          value={itemFormData.name}
          onChange={handleChange}
          placeholder="Name"
        />
       <input
          type="number"
          name="price"
          value={itemFormData.price}
          onChange={handleChange}
          placeholder="Price"
        />
       <input
          type="number"
          name="quantity"
          value={itemFormData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />

        <button type="submit">{itemId ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ItemForm;
