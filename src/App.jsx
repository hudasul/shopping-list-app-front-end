import AllLists from "./components/AllLists"
import { useState } from "react"
import ListDetails from "./components/ListDetails"
const App = () =>{
  const [ selectedList,setSelectedList ] = useState(null)

  const handleSelectedList = (list)=>{
    setSelectedList(list)

  }
  return(

    <>
      {
        selectedList
        ?
        <ListDetails selectedList={selectedList}/>
        :
        <AllLists handleSelectedList={handleSelectedList}/>

      }
    </>
  )
}

export default App