import express from 'express';
// import cors from 'cors';
import { sample_countries, sample_users } from './data';
import jwt from 'jsonwebtoken';

const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

app.get("/api/countries", (req, res) => {
    res.send(sample_countries)
})

app.get("/api/countries/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm
    const countries = sample_countries.filter(country => country.name.toLowerCase()
    .includes(searchTerm.toLowerCase()))
    res.send(countries)
})

app.get("/api/countries/:id", (req, res) => {
    const id = req.params.id
    const country = sample_countries.find(country => country.id == id);
    res.send(country)
})

app.post("/api/users/login", (req, res) => {
    const {username, password} = req.body;
    const user = sample_users.find(user => user.username == username && user.password == password);
    
    if (user) {
        res.send(genTokRes(user));
    } else {
        res.status(400).send("Invalid login details")
    }

})

const genTokRes = (user: any) => {
    const token = jwt.sign({
        username: user.username, isAdmin:user.isAdmin
    }, "JWTSECRETKEY", {
        expiresIn: "30d"
    })
    user.token = token
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website is on https://localhost:"+port);
})