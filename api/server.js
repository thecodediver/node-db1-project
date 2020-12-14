const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.post("/user", (req, res) => {
  db("accounts").insert(req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
})

server.put("/user", (req, res) => {
  db("accounts").update(req.body).where({ id: req.body.id })
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
})

server.get("/user/:id", (req, res) => {
  const id = req.params.id
  db("accounts").where({ id })
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
})

server.delete("/user/:id", (req, res) => {
  const id = req.params.id
  db("accounts").where({ id }).del()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({ message: err.message })
  })
})

module.exports = server;
