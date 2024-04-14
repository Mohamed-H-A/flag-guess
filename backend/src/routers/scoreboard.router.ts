import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Scoreboard, ScoreboardModel } from '../models/scoreboard.model';
const router = Router();

router.get("/", asyncHandler(
    async (req, res) => {
        const scores = await ScoreboardModel.find().sort({highscore: -1})
        res.send(scores)
    }
))

router.post("/newscore", asyncHandler(
    async (req, res) => {
    const {username, highscore} = req.body;
        const newScore: Scoreboard = {
            id: '',
            username: username,
            highscore: highscore
        }
        const dbScore = (highscore > 0) ? (await ScoreboardModel.create(newScore)) : newScore
        res.send(dbScore)
    }
    
))

export default router