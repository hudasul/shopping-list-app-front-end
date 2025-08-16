import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const AllLists = (props) => {
 

  const getAllLists = async () => {
     try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/shoppingList`;
    const response = await axios.get(url);
    props.setShoppingLists(response.data);
  } catch (error) {
    console.log(error)
  }
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/shoppingList/${id}`);
    props.setShoppingLists(props.shoppingLists.filter(list => list._id !== id));
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <>
      <h1>All Shopping Lists</h1>
      <button onClick={()=> props.handleAddListButtonClick()}>Add new List</button>
      {props.shoppingLists.map((list)=>{
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