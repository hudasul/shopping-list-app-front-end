import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const AllLists = (props) => {
  const [shoppingLists, setShoppingLists] = useState([])

  const getAllLists = async () => {
     try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/shoppingList`;
    const response = await axios.get(url);
    setShoppingLists(response.data);
  } catch (error) {
    console.log(error)
  }
  };

  const handleDelete = async (id)=>{
    const url = `${import.meta.env.VITE_BACKEND_URL}/shoppingList/${id}`;
    const response = await axios.delete(url);
    return response, getAllLists()
  }
  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <>
      <h1>All Shopping Lists</h1>
      <button onClick={()=> props.handleAddListButtonClick()}>Add new List</button>
      {shoppingLists.map((list)=>{
        return(
            <div key={list._id}>
                <h2>{list.name}</h2>
                <p>Last date to purchase: {new Date(list.date).toLocaleDateString()}</p>
                <button onClick={()=> props.handleSelectedList(list)}>View Details</button>
                <button onClick={()=> handleDelete(list._id)}>Delete</button>
            </div>
        )
      })}

    </>
  );
};

export default AllLists;
