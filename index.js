import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

try {
    const result = await axios.get("https://rickandmortyapi.com/api/character/1");
    res.render("index.ejs", {content: JSON.stringify(result.data)})
}

catch (error) {
    console.error(error.message);
    res.render("index.ejs", {error: error.message});
}

})

app.listen(port, () => {

    console.log(`Listening on port ${port}.`)

})