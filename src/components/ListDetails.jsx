import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ListDetails = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getListDetails = async (id) => {
    try {
      const listResponse = await axios.get(`${baseUrl}/shoppingList/${id}`);
      setList(listResponse.data);

      const itemsResponse = await axios.get(
        `${baseUrl}/shoppingList/${id}/item`
      );
      setItems(itemsResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (listId) {
      getListDetails(listId);
    }
  }, [listId]);

  const handleDeleteItem = async (itemId) => {
    await axios.delete(`${baseUrl}/item/${itemId}`);
    const updatedItems = items.filter((item) => item._id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>All Shopping Lists</button>
      <h2>{list.name}</h2>
      <button onClick={() => navigate(`/list/${listId}/new-item`)}>
        Add Item
      </button>
      <ul>
        {items.length === 0 ? (
          <h2>This List is Empty!</h2>
        ) : (
          items.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <p>Price: {item.price} BD</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() =>
                  navigate(`/list/${listId}/edit-item/${item._id}`)
                }
              >
                Edit
              </button>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListDetails;
