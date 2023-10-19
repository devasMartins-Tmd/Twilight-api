import express from 'express';
import cors from 'cors';
import * as cloudinary from 'cloudinary';
import { deleteAPost } from '../controllers/delete';
import { getUserPersonalPosts, getPostComment, getExploreUsers } from '../controllers/get';
import { updatePostLike } from '../controllers/put';
import { postAPostComment, makeAPostFunction } from '../controllers/post';

//configuration
cloudinary.v2.config({
   cloud_name: 'dmaag3pvx',
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
});

const fnPost = express.Router();

//middlewares
fnPost.use(express.json({ limit: '300mb' }));
fnPost.use(express.urlencoded({ extended: true }));
fnPost.use(cors({ origin: '*' }));

fnPost.route('/function/post/post').post(makeAPostFunction);
fnPost.route('/function/post/comment/post').post(postAPostComment);
fnPost.route('/function/post/get').get(getUserPersonalPosts);
fnPost.route('/function/explore').get(getExploreUsers);
fnPost.route('/function/post/comment/get/:id').get(getPostComment);
fnPost.route('/function/post/like/inc/:id').put(updatePostLike);
fnPost.route('/function/post/delete/:id').delete(deleteAPost);

module.exports = fnPost;
