import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './style/AllLists.css'
const AllLists = ({ token, user }) => {
  const [errors, setErrors] = useState("");
  const [lists, setLists] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getAllLists = async () => {
    if (!token || !user) return;

    try {
      const url = `${baseUrl}/shoppingList`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userLists = response.data.filter(
        (list) => list.creator === user.id
      );
      setLists(userLists);
    } catch (error) {
      setErrors("Unauthorized or error fetching data");
    }
  };

  const sortListsByDate = () => {
    const sortedList = [...lists].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setLists(sortedList);
  };

  const handleDelete = async (listId) => {
    await axios.delete(`${baseUrl}/shoppingList/${listId}`);
    setLists((prev) => prev.filter((list) => list._id !== listId));
  };

  useEffect(() => {
    if (sortByDate) {
      sortListsByDate();
    } else {
      getAllLists();
    }
  }, [sortByDate]);

  return (
    <>
      <div className="container">
        <h2>All Shopping Lists</h2>
        <button className="add-button" onClick={() => navigate("/new-list")}>
          Add New List
        </button>
        <div className="sort-by-date">
          <div id="inner-sort-date">
            
            <input
              type="checkbox"
              checked={sortByDate}
              onChange={(event) => setSortByDate(event.target.checked)}
            />
            <div>
              <label>Sort by Date</label>
            </div>

          </div>
        </div>
        {lists.length === 0 ? (
          <h2>There are no Lists</h2>
        ) : (
          lists.map((list) => (
            <div className="list" key={list._id}>
              <div className="list-info">
              <h1>{list.name}</h1>
              <p>
                Last date to purchase:{" "}
                {new Date(list.date).toLocaleDateString()}
              </p>
              </div>
              <div className="buttons">
              <button onClick={() => navigate(`/list/${list._id}`)}>
                View
              </button>
              <button onClick={() => navigate(`/edit-list/${list._id}`)}>
                Edit
              </button>
              <button onClick={() => handleDelete(list._id)}>Delete</button>
            </div>
            </div>
          ))
        )}

        <p style={{ color: "darkred" }}>{errors}</p>
      </div>
    </>
  );
};

export default AllLists;
