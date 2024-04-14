import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { CountryModel, getCountriesFromAPI } from '../models/country.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const countryCount = await CountryModel.countDocuments()
        if (countryCount > 0) {
            res.send("Seed already completed")
            return
        }
        const countries = await getCountriesFromAPI()
        await CountryModel.create(countries)
        res.send("Seed now completed")
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const countries = await CountryModel.find()
        res.send(countries)
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const seachRegex = new RegExp(req.params.searchTerm, 'i')
        const countries = await CountryModel.find({name: {$regex: seachRegex}})
        res.send(countries)
    }
))

router.get("/random", asyncHandler(
    async (req, res) => {
        const random_country = await CountryModel.aggregate([{ $addFields: { random: { $rand: {} } } },
            { $sort: { random: 1 } },
            { $limit: 1 }, { $addFields: { id: '$_id' } }])
        res.send(random_country[0])
    }
))

router.get("/:id", asyncHandler(
    async (req, res) => {
        const id = req.params.id
        const country = await CountryModel.findById(id);
        res.send(country)
    }
))

export default router