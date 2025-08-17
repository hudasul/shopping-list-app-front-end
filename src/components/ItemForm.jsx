import React from 'react'
import { useState } from "react";
import axios from "axios";

const ItemForm = (props) => {
   const [itemFormData, setItemFormData] = useState({
  name: '',
  price: '',
  quantity: ''
});

const handleChange = (event) => {
    setItemFormData({ ...itemFormData, [event.target.name]: event.target.value }); 
  };

const handleSubmit= async (event)=>{
    event.preventDefault();
    const ListID = props.selectedList._id
    const url= `${import.meta.env.VITE_BACKEND_URL}/shoppingList/${ListID}/item`
    const response = await axios.post(url,itemFormData)
    setItemFormData(response.data)
    props.addItemToList(itemFormData)

}
  return (
    <>
        <h1>Add an Item</h1>
         <form onSubmit={handleSubmit} >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={itemFormData.name}
          onChange={handleChange}
    
        />
        <br />
        <br />

        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          value={itemFormData.price}
          onChange={handleChange}

        />
        <br />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={itemFormData.quantity}
          onChange={handleChange}


        />
        <br />
        <br />

        <button>Add</button>
      </form>
    </>
  )
}

export default ItemForm