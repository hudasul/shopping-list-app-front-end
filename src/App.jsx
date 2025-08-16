import AllLists from "./components/AllLists";
import ListDetails from "./components/ListDetails";
import ListForm from "./components/ListForm";

import { use, useState } from "react";

const App = () => {
  
  const [selectedList, setSelectedList] = useState(null);
  const [addList, setAddList] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const handleSelectedList = (list) => {
    setSelectedList(list);
  };

  const handleAddListButtonClick = () => {
    setFormIsShown(true);
    setAddList(true);
  };

  return (
    <>
      {formIsShown ? (
        <ListForm setFormIsShown={setFormIsShown} setAddList={setAddList} />
      ) : null}

      {selectedList ? (
        <ListDetails selectedList={selectedList} />
      ) : (
        <AllLists
          handleSelectedList={handleSelectedList}
          handleAddListButtonClick={handleAddListButtonClick}
          setFormIsShown={setFormIsShown}
        />
      )}
    </>
  );
};

export default App;
