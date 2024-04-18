// src/MyApp.jsx

import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
function MyApp() { 
    const [characters, setCharacters] = useState([
    ]);
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    // Edit for delete on backend
    function removeOneCharacter(index) {
        let id;
        // This function creates a new array excluding removed
        const updated = characters.filter((character, i) => {
          if(i === index) {
            id = character.id;
          }
          return i !== index;
        }); 
         
        setCharacters(updated);
        deleteUser(id); // ERROR: HOW DO I GET ID  
    };
   
    // function updateList(person) { 
    //   postUser(person)
    //     .then(() => setCharacters([...characters, person]))
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
    function updateList(person) { 
      postUser(person)
        .then((response) => {
          // Only update if 201 message received
          if (response.status === 201) {
            setCharacters([...characters, person]);
            console.log('User added');
          } else {
            console.error('Error adding user');
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }
    // Purpose: Make the HTTP request deletion
    function deleteUser(id) {
      const promise = fetch("Http://localhost:8000/users/" + id, {
        method: "DELETE",
        
      }).then((response) => {
        if(!response.ok){
          console.log('Error deleting row');
        }
        return response.json()
      })
      ;
  
      return promise;
    }
  
    
    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
          
        </div>
      );
}
//function MyApp() {
//  return (
//    <div className = "container">
 //     <Table characterData={characters} />
 //   </div>
 // );
//}
export default MyApp;
