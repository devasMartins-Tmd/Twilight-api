import express from 'express';
import cors from 'cors';
import { getUser, getWelcomeRoute } from '../controllers/get';
import { postAuthToLogin, postAuthToSignUp } from '../controllers/post';
import { updateProfile } from '../controllers/put';
import { deleteAccount } from '../controllers/delete';

const authRoute = express.Router();

//authRoute: Middleware
authRoute.use(cors({ origin: '*' }));
authRoute.use(express.json({ limit: '300mb' }));
authRoute.use(express.urlencoded({ extended: true }));

//authRoute: Route
authRoute.route('/welcome').get(getWelcomeRoute);
authRoute.route('/auth/signup').post(postAuthToSignUp);
authRoute.route('/auth/login').post(postAuthToLogin);
authRoute.route('/put/profile').put(updateProfile);
authRoute.route('/delete/profile').delete(deleteAccount);

module.exports = authRoute;
