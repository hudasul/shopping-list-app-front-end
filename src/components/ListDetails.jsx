import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import './style/ListDetails.css'

const ListDetails = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  let totalMoney = 0 

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
  const calculateAmount = (items) => {
    
    (items
    ?
    items.map((item)=>{
      totalMoney += item.price * item.quantity
    })
    :
    null)

  }
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
    <>
    <div>
      <h1>{list.name}</h1>
      {calculateAmount(items)}
        <h2 id="amount">Total Amount: {totalMoney}</h2>
        <div className="button-style">
        <button id="add-button" onClick={() => navigate(`/list/${listId}/new-item`)}>
        Add New Item
      </button>
       <button id="shopping-list-button" onClick={() => navigate("/")}>All Shopping Lists</button>
      </div>
   
      <ul>
        {items.length === 0 ? (
          <h1>This List is Empty!</h1>
        ) : (
          items.map((item) => (
            <div className="container" key={item._id}>
              <div className="list-items">
              <h2>{item.name}</h2>
              <p>Price: {item.price} BD</p>
              <p>Quantity: {item.quantity}</p>
              </div>
              <div className="buttons">
              <button
                onClick={() =>
                  navigate(`/list/${listId}/edit-item/${item._id}`)
                }
              >
                Edit
              </button>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
            </div>
          ))
        )}
      </ul>
    </div>
    </>
  );
};

export default ListDetails;
