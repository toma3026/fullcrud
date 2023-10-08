
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ data: "mountains" });
});

const mountains = [];

let currentId = 3;

mountains.push({
    id: 0,
    name: "Mount Everest",
    height: 8849,
    countries: ["China", "Nepal"]
});

mountains.push({
    id: 1,
    name: "K2",
    height: 8611,
    countries: ["China", "Pakistan"]
});

mountains.push({
    id: 2,
    name: "Cho Oyu",
    height: 8188,
    countries: ["China", "Nepal"]
});

app.get("/mountains", (req, res) => {
    res.send(mountains);
});

app.get("/mountains/:id", (req, res) => {
    res.send(mountains.find(
        (mountain) => mountain.id == req.params.id
    ));
});

app.post("/mountains", (req, res) => {
    const newMountain = req.body;
    console.log(newMountain);
    newMountain.id = ++currentId;
    mountains.push(newMountain);
    res.send({ data: newMountain});
});

app.patch("/mountains/:id", (req, res) => {
    let foundIndex = mountains.findIndex((mountain) => mountain.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ error: `Could not find mountain by id ${req.params.id}` });
    } else {
        mountains[foundIndex] = { ...mountains[foundIndex], ...req.body, id: Number(req.params.id)};
        res.send({ data: mountains[foundIndex] });
    }
});

app.delete("/mountains/:id", (req, res) => {
    const foundIndex = mountains.findIndex((mountain) => mountain.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ error: `Could not find mountain by id ${req.params.id}` });
    } else {
        mountains.splice(foundIndex, 1);
        res.send({ data: Number(req.params.id) });
    }
});

app.listen(8080);
