import dotenv from 'dotenv'
dotenv.config()
process.env.MONGO_URI
import express from 'express'
import countriesRouter from './routers/countries.router'
import userRouter from './routers/user.router'
import { dbConnect } from './configs/database.config'

dbConnect();
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.use("/api/countries", countriesRouter)
app.use("/api/users", userRouter)

const port = 5000;
app.listen(port, () => {
    console.log("Website is on https://localhost:"+port);
})