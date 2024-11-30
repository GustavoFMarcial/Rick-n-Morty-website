import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://rickandmortyapi.com/api/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {

        res.render("index.ejs");

})

app.post("/submit", async (req, res) => {

    const characterId = req.body.id;

    try {
        const response = await axios.get(API_URL +  `character/${characterId}`);
        const data = [
            {data: JSON.stringify(response.data.name)},
            {data: JSON.stringify(response.data.status)},
            {data: JSON.stringify(response.data.species)},
            {data: JSON.stringify(response.data.gender)},
            {data: JSON.stringify(response.data.origin.name)}
        ];
        res.render("index.ejs", {data: data});
    }

    catch (error) {
        console.error(error);
        res.render("index.ejs", {error: error.message});
    }

})

app.listen(port, () => {

    console.log(`Listening on port ${port}.`)

})