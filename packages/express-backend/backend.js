// backend.js
import express from "express";

// Create instance of express
const app = express();
const port = 8000;
// Set express app to process data in JSON format
app.use(express.json());
// First API endpoint
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
  );
});
