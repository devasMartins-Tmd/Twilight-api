import express from 'express';
import cors from 'cors';
import { getExploreUsers } from '../controllers/get';

const exploreRoute = express.Router();

exploreRoute.use(express.json({ limit: '300mb' }));
exploreRoute.use(cors({ origin: '*' }));
exploreRoute.use(express.urlencoded({ extended: true }));

exploreRoute.route('/explore/get').get(getExploreUsers);

module.exports = exploreRoute;
