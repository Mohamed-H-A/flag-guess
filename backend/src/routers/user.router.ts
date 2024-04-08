import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
import { HTTP_BAD_REQUEST } from '../constants/http_status'

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await UserModel.countDocuments()
        if (userCount > 0) {
            res.send("Seed already completed")
            return
        }
        await UserModel.create(sample_users)
        res.send("Seed now completed")
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const {username, password} = req.body;
        const user = await UserModel.findOne({username})

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(genTokRes(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send({"message": "Invalid login details"})
        }
    
    }
))

router.post("/register", asyncHandler(
    async (req, res) => {
        const {name, username, password, highscore} = req.body;
        const user = await UserModel.findOne({username})
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("Username '" + username + "' is already in use")
            return;
        } else {
            const encryptedPass = await bcrypt.hash(password, 10)
            const newUser: User = {
                id: '',
                name: name,
                username: username,
                password: encryptedPass,
                highscore: highscore,
                isAdmin: false
            }

            const dbUser = await UserModel.create(newUser)
            res.send(genTokRes(dbUser))
        }
    }
))

const genTokRes = (user: User) => {
    const token = jwt.sign({
        username: user.username, 
        isAdmin: user.isAdmin
    }, "JWTSECRETKEY", {
        expiresIn: "30d"
    })
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        highscore: user.highscore,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router