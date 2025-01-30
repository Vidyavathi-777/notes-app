import React ,{useState} from "react";
import './App.css'; 


const SearchNotes = ({onSearch}) =>{
    
    const[searchTerm,setSearchTerm] = useState("")

    const handleInputChange= (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); // Pass the updated search term to the parent
      };

    return(
        <div>
            <input type="text" placeholder="Search notes.." value={searchTerm}
            onChange={handleInputChange}/>
        </div>
    )
}

export default SearchNotes;