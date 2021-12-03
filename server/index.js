const express = require("express");
const cors = require("cors");

const app = express();
const ctrl = require('./controller.js')


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", ctrl.getCompliment);
app.get("/api/fortune", ctrl.getFortune);
app.post('/api/fortune', ctrl.addFortune);


app.post('/api/pictures', ctrl.addPicture);
app.get('/api/pictures', ctrl.getImages)
app.delete('/api/pictures/:id', ctrl.deletePicture)







app.listen(4004, () => console.log("Server running on 4004"));
