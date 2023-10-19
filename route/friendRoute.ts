import express from 'express';
import cors from 'cors';
import { updateFriendOff, updateFriends } from '../controllers/put';
import { getFriends } from '../controllers/get';

const friendRoute = express.Router();

//friendRoute: Middleware
friendRoute.use(express.json({ limit: '300mb' }));
friendRoute.use(cors({ origin: '*' }));
friendRoute.use(express.urlencoded({ extended: true }));

//friendRoute: Route
friendRoute.route('/friend/add').put(updateFriends);
friendRoute.route('/friend/get').get(getFriends);
friendRoute.route('/friend/remove').put(updateFriendOff);

module.exports = friendRoute;
