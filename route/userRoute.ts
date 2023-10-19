import express from 'express';
import cors from 'cors';
import { getNotifications, getUser } from '../controllers/get';
import { deleteNotification } from '../controllers/delete';

const userRoute = express.Router();

//userRoute: Middlewares
userRoute.use(cors({ origin: '*' }));
userRoute.use(express.json({ limit: '300mb' }));
userRoute.use(express.urlencoded({ extended: true }));

//useRoute: Route
userRoute.route('/notification/get').get(getNotifications);
userRoute.route('/getUser').get(getUser);
userRoute.route('/notification/delete').delete(deleteNotification);

module.exports = userRoute;
