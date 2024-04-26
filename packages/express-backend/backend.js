// backend.js
// ON END OF STEP 2
import express from "express";
import cors from "cors";
import userService from "./user-service.js";
import mongoose from "mongoose";

// Create instance of express
const app = express();
const port = 8000;
// Enable all CORS requests
app.use(cors());
// Set express app to process data in JSON format
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "test",
        name: "Dee",
        job: "Tester"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
//   const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
//   };
// // First API endpoint
//  app.get("/users", (req, res) => {
//    const name = req.query.name;
//    if (name != undefined) {
//      let result = findUserByName(name);
//      result = { users_list: result };
//      res.send(result);
//    } else {
//     res.send(users);
//    }
//  });


// Get user by name
// app.get("/users", (req, res) => {
//  const name = req.query.name;
//  userService.findUserByName(name).then((result) => {
//    if (result === undefined || result === null)
//     res.status(404).send("Name not found");
//     else res.send({users_list: result});
//  });
// });
// EDIT COMBINE GET JOB AND NAME INTO 1
// // Get user by job
// app.get("/users", (req, res) => {
//   const job = req.query.job;
//   userService.findUserByJob(job).then((result) => {
//     if (result === undefined || result === null)
//      res.status(404).send("Name not found");
//      else res.send({users_list: result});
//   });
//  });

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);
// // for finding user by id
// app.get("/users/:id", (req, res) => {
//    const id = req.params["id"]; //or req.params.id
//    let result = findUserById(id);
//    if (result === undefined) {
//      res.status(404).send("Resource not found.");
//    } else {
//      res.send(result);
//    }
//  });

// for finding user by id
app.get("/users/:id", (req, res) => {
   const id = req.params["id"]; //or req.params.id
   userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});
 // Step 7: Implement DELETE by id
//  app.delete("/users/:id", (req, res) => {
//    const id = req.params["id"]; // get the id in the url
//    const index = users["users_list"].findIndex((user) => user.id === id);
//    if (index !== -1) {
//       // Delete user
//       users["users_list"].splice(index, 1);
//       res.status(200).json({message: 'Deleted'});
//    } else {
//      res.status(404).json({error: 'User not found'});
//    }
//  });

// Find by Id and Delete
app.delete("/users/:id", (req, res) => {
  // Its getting here
  console.log("Deleting?");
  const id = req.params["id"]; // get the id in the url
  
  userService.findByIdAndDelete(id).then((result) => {
    if (result === undefined || result === null) {
      res.status(404).send("Id not found");
      console.log('User not found');
    }
    else {
      res.status(201).send("Success delete");
      console.log('Deleted User');
    } 
  })
  .catch((error) => {
    console.error("Error");
    res.status(500).send("Error Deleting user");
  });
});
 
//  // Step 7: Implement get for name and job
//  // Example query /users?name=Brent&job=Student
//  const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     (user) => (user["name"] === name && user["job"] === job));
//  };
// // changed from /users to find
//  app.get("/find", (req, res) => {
//    const name = req.query.name;
//    const job = req.query.job;
//    if (name != undefined && job != undefined) {
//      let result = findUserByNameAndJob(name, job);
//      if (result.length > 0) {
//        res.status(200).json(result);
//      } else {
//        // No user found
//        res.status(404).json({error: "No user found"});
//      }
//    } else {
//      // Name or job is undefined error case
//      res.status(400).json({error: "No name or job"});
//    }
//  });

// Step 7: Implement get for name and job
// Example query /users?name=Brent&job=Student
 
 app.get("/users", (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   userService.getUsers(name, job).then((result) => {
     console.log(result);
    res.send({users_list: result});
   })
   .catch((error) => {
     console.log(error);
     res.status(500).send("Error in server")
   });
   
 });

function randomId() {
  return Math.floor(Math.random()
  * (Math.floor(999) - Math.ceil(0) + 1)) + Math.ceil(0);
}
// Edit to add the random id in
// const addUser = (user) => {
//   const newUser = {
//     id: randomId().toString(),
//     name: user.name,
//     job: user.job,
//   }
//   users["users_list"].push(newUser);
//   return newUser;
// };
// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   addUser(userToAdd);
//   // Change to a 201 response
//   //res.send();
//   res.status(201).json(userToAdd);
// });

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
  );
});
