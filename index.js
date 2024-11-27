import bodyParser from "body-parser";
// Import required modules
import express from "express";
import axios from "axios";

// Create an Express application
const app = express();


const app = express();
const Port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather"


const yourAPIKey = ""

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { data: null, error: null });
});

// Use POST to handle form submission
app.post("/", async (req, res) => {
    const city = req.body.city; // Get city name from form input
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                appid: yourAPIKey,
            }
        });

        const result = response.data;
        res.render("index.ejs", { data: result });
        console.log(result);
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
    }
});

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}.`);
});
