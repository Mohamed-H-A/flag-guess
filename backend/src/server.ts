import express from 'express';
import cors from 'cors';
import { sample_countries } from './data';

const app = express();
app.use(cors({
    credentials: true,
    origin:["https://127.0.0.1:4200", "https://localhost:4200"],
}));

app.get("/api/countries", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(sample_countries)
})

app.get("/api/countries/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm
    const countries = sample_countries.filter(country => country.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(countries)
})

app.get("/api/countries/:id", (req, res) => {
    const id = req.params.id
    const country = sample_countries.find(country => country.id == id);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(country)
})

const port = 5000;
app.listen(port, () => {
    console.log("Website is on https://127.0.0.1:"+port);
})