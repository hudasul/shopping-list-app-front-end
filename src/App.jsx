import AllLists from "./components/AllLists";
import ListDetails from "./components/ListDetails";
import ListForm from "./components/ListForm";

import { use, useState } from "react";

const App = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [addList, setAddList] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [formIsShown, setFormIsShown] = useState(false);
  const [updatedList,setUpdatedList] = useState(null);
  
  const handleSelectedList = (list) => {
    setSelectedList(list);
  };

  const handleAddListButtonClick = () => {
    setUpdatedList(null); 
    setFormIsShown(true);
    setAddList(true);
  };

  const handleUpdate = (list)=>{
     setUpdatedList(list)
     setFormIsShown(true);
  }

  return (
    <>
      {formIsShown ? (
        <ListForm
          setFormIsShown={setFormIsShown}
          setAddList={setAddList}
          setShoppingLists={setShoppingLists}
          shoppingLists={shoppingLists}
          updatedList={updatedList}
        />
      ) : null}

      {selectedList ? (
        <ListDetails selectedList={selectedList} />
      ) : (
        <AllLists
          handleSelectedList={handleSelectedList}
          handleAddListButtonClick={handleAddListButtonClick}
          setFormIsShown={setFormIsShown}
          shoppingLists={shoppingLists}
          setShoppingLists={setShoppingLists}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default App;
