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
            {data: "Name: " + JSON.stringify(response.data.name).replace(/"/g, '')},
            {data: "Status: " +  JSON.stringify(response.data.status).replace(/"/g, '')},
            {data: "Specie: " +  JSON.stringify(response.data.species).replace(/"/g, '')},
            {data: "Gender: " +  JSON.stringify(response.data.gender).replace(/"/g, '')},
            {data: "Origin: " +  JSON.stringify(response.data.origin.name).replace(/"/g, '').replace("(Replacement Dimension)", "")},
            {data: JSON.stringify(response.data.image).replace(/"/g, '')}
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