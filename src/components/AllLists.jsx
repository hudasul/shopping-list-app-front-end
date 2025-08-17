import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AllLists = () => {
  const [lists, setLists] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

   const getAllLists = async () => {
    try {
      const url = `${baseUrl}/shoppingList`;
      const response = await axios.get(url);
      setLists(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   getAllLists()
  }, []);

  const handleDelete = async (listId) => {
    await axios.delete(`${baseUrl}/shoppingList/${listId}`);
    setLists((prev) => prev.filter((list) => list._id !== listId));
  };

  return (
    <>
    <div>
      <h2>All Shopping Lists</h2>
      <button onClick={() => navigate("/new-list")}>Add New List</button>
      {lists.map((list) => (
        <div key={list._id}>
          <h1>{list.name}</h1>
          <p>Last date to purchase: {new Date(list.date).toLocaleDateString()}</p>
          <button onClick={() => navigate(`/list/${list._id}`)}>View</button>
          <button onClick={() => navigate(`/edit-list/${list._id}`)}>Edit</button>
          <button onClick={() => handleDelete(list._id)}>Delete</button>
        </div>
      ))}
    </div>
    </>
  );
};

export default AllLists;
