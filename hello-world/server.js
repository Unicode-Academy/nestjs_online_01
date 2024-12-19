import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  const user = {
    id: 1,
    name: "Huy",
    age: 20,
  };
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
