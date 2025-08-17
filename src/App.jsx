import AllLists from "./components/AllLists";
import ListDetails from "./components/ListDetails";
import ListForm from "./components/ListForm";
import ItemForm from "./components/ItemForm";

import { use, useState } from "react";

const App = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [addList, setAddList] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [formIsShown, setFormIsShown] = useState(false);
  const [itemFormIsShown,setItemFormIsShown ] = useState(false);
  const [updatedList,setUpdatedList] = useState(null);
  const [item,setItem ] = useState(null)
  
  const handleSelectedList = (list) => {
    setSelectedList(list);
  };

  const handleAddListButtonClick = (listId) => {
    setUpdatedList(null); 
    setFormIsShown(true);
    setAddList(true);
  };

  const handleAddItemButtonClick = () => {

    setItemFormIsShown(true)
  
  };

  const addItemToList = async (itemFormData)=>{
    const newItem = {...itemFormData}
    setItem(newItem)

  }

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

      {
        itemFormIsShown
        ?
        <ItemForm selectedList={selectedList} addItemToList={addItemToList}/>
        :
        null

      }

      {selectedList ? (
        <ListDetails selectedList={selectedList} handleAddItemButtonClick={handleAddItemButtonClick}  shoppingLists={shoppingLists}
          setShoppingLists={setShoppingLists} />
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
