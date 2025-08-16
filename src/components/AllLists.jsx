import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const AllLists = () => {
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

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <>
      <h1>AllLists</h1>
      {shoppingLists.map((list)=>{
        return(
            <div key={list._id}>
                <h2>{list.name}</h2>
                <p>Last date to purchase: {new Date(list.date).toLocaleDateString()}</p>
            </div>
        )
      })}

    </>
  );
};

export default AllLists;
