// backend.js
import express from "express";

// Create instance of express
const app = express();
const port = 8000;
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
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };
// First API endpoint
app.get("/users", (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
  );
});
