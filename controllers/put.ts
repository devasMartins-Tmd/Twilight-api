/**
 * @desc file for PUT requests
 * @route /function/put/'*'
 */

import { Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import userModel from '../models/user';
import post from '../models/post';
import { userT } from '../type';
import all from '../models/misc';
import { MakeImage, filterObject, getId, notifyMessage, assetFolder } from '../__util__/util1';
import * as cloudinary from 'cloudinary';

const [Post, Profile] = assetFolder;

export const updatePostLike = async (req: Request, res: Response) => {
   let tokenId: any = getId(req);
   let user: userT | null = await userModel.findById(tokenId);
   if (user && user.id) {
      let postId = req.params.id;
      let postExist = await post.findById(postId);
      let isExist = postExist?.likeUserId.map((item) => String(item)).includes(String(user.id));
      if (postExist) {
         if (!isExist) {
            await postExist.updateOne({ $push: { likeUserId: user.id }, $inc: { likes: +1 } });
            await all.notifications.create({
               text: `${user.name} Liked your post`,
               type: 'success',
               userId: postExist.userId,
            });
            await all.notifications.create(notifyMessage(postExist.userId, `${user.name} Liked your post`, 'success'));
            res.status(200).json({ done: true, message: 'Like Incremented!' });
         } else {
            await postExist.updateOne({ $pull: { likeUserId: user.id }, $inc: { likes: -1 } });
            res.status(200).json({ done: true, message: 'Like Decremented!' });
         }
      } else res.status(400).json({ done: false, message: 'Post not found!' });
   }
};

export const updateFriends = async (req: Request, res: Response) => {
   let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
   tokenId = tokenId['id'];
   let user: userT | null = await userModel.findById(tokenId);
   let newFriend = await userModel.findById(req.body.id);
   if (user && newFriend) {
      await all.friends.create({
         userId: tokenId,
         frndId: newFriend.id,
         frndName: newFriend.name,
      });
      res.status(200).json({ done: true, message: `${newFriend.name} has become a friend!` });
   } else {
      res.status(400).json({ done: true, message: `Error making friends with ${newFriend?.name}` });
   }
};

export const updateFriendOff = async (req: Request, res: Response) => {
   let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
   tokenId = tokenId['id'];
   let user: userT | null = await userModel.findById(tokenId);
   let unFriendId = req.body.unFriendId;

   if (user && user.id) {
      let actionUnRemove = await all.friends.findOneAndDelete({
         frndId: unFriendId,
         userId: user.id,
      });
      if (actionUnRemove) res.status(200).json({ done: true });
      else res.status(400).json({ done: false });
   } else res.status(404).json({ done: false, message: 'User not Found' });
};

export const updateProfile = async (req: Request, res: Response) => {
   let tokenId: any = getId(req);
   let user: userT | null = await userModel.findById(tokenId);
   if (user && user.id) {
      const { img, info } = filterObject(req.body);
      delete info.oldPassword;
      if (img) {
         let pubId = 'B0B' + Math.floor(Math.random() * 1000);
         let [isDone, fileName] = MakeImage(img, user.name || '');

         if (isDone && fileName) {
            if (user.publicId && user.profileImg) {
               cloudinary.v2.uploader.destroy(`${Profile}/${user.publicId}` || '', { invalidate: true }, (err, result) => {
                  if (err) return console.log(err);
                  else console.log(result);
               });
            }

            cloudinary.v2.uploader.upload(`./${fileName}`, { folder: Profile, public_id: pubId }, async (err, response) => {
               if (err) return console.log(err);
               if (response && response.type === 'upload') {
                  info['profileImg'] = response.url;
                  info['publicId'] = pubId;
                  const upd: any = await userModel.findByIdAndUpdate(tokenId, info);
                  if (upd) {
                     await all.notifications.create(notifyMessage(tokenId, 'Profile created successfully', 'success'));
                     res.status(200).json({ done: true, message: 'updated!' });
                  } else {
                     res.status(400).json({ done: false, message: 'Post not created!' });
                  }
               } else res.status(400).json({ done: false, message: 'Error!' });
            });
         } else res.status(400).json({ done: false, message: 'Image is not created' });
      } else {
         const upd: any = await userModel.findByIdAndUpdate(tokenId, info);
         if (upd) {
            await all.notifications.create(notifyMessage(tokenId, 'Post created successfully', 'success'));
            res.status(200).json({ done: true, message: 'updated!' });
         } else res.status(400).json({ done: false, message: 'Post not created!' });
      }
   } else res.status(404).json({ done: false, message: 'User not found!' });
};
