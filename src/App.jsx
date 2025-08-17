import AllLists from "./components/AllLists";
import ListForm from "./components/ListForm";
import ListDetails from "./components/ListDetails";
import ItemForm from "./components/ItemForm";

import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = ()=> {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AllLists />} />
        <Route path="/new-list" element={<ListForm />} />
        <Route path="/edit-list/:listId" element={<ListForm />} />
        <Route path="/list/:listId" element={<ListDetails />} />
        <Route path="/list/:listId/new-item" element={<ItemForm />} />
        <Route path="/list/:listId/edit-item/:itemId" element={<ItemForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
