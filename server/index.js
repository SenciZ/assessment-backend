const express = require("express");
const cors = require("cors");

const app = express();
const ctrl = require('./controller.js')


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", ctrl.getCompliment);

app.listen(4004, () => console.log("Server running on 4000"));
