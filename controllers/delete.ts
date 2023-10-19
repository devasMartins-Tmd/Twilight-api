/**
 * @desc file for delete routes
 * @route /function/delete/'*'
 */
import { Request, Response } from 'express';
import userModel from '../models/user';
import post from '../models/post';
import { userT } from '../type';
import * as cloudinary from 'cloudinary';
import all from '../models/misc';
import { getId } from '../__util__/util1';

export const deleteAPost = async (req: Request, res: Response) => {
   let tokenId = getId(req);
   let user: userT | null = await userModel.findById(tokenId);
   if (user && user.id) {
      let postId = req.params.id,
         postExist = await post.findById(postId);
      const not = await all.notifications.create({
         text: `Post deleted successfully`,
         type: 'danger',
         userId: user.id,
      });
      console.log(not);
      if (postExist?.userId?.equals(tokenId)) {
         await postExist.deleteOne();
         if (postExist && postExist.img) {
            cloudinary.v2.uploader.destroy(
               `FarmHub_User_Post_Img/${postExist.publicId}` || '',
               {
                  invalidate: true,
               },
               (err, result) => {
                  if (err) return console.log(err);
                  else console.log(result);
               }
            );
            res.status(200).json({ done: true, message: 'One Item deleted!' });
         } else {
            res.status(400).json({ done: true, message: 'Error occured delete post!' });
         }
      } else res.status(200).json({ done: false });
   }
};

export const deleteNotification: any = async (req: Request, res: Response) => {
   let tokenId = getId(req);
   let user: userT | null = await userModel.findById(tokenId);
   let notificationId = req.body.id;
   if (user && user.id) {
      await all.notifications.findOneAndDelete({
         userId: user.id,
         _id: notificationId,
      });
      res.status(200).json({ done: true, message: 'notification removed' });
   } else res.status(404).json({ done: false, message: 'User not found' });
};

export const deleteAccount = async (req: Request, res: Response) => {
   let tokenId = getId(req);
   let { password } = req.body;
   let user: userT | null = await userModel.findById(tokenId);
   let fromUserPassword = await userModel.find({ password });
   console.log(user, fromUserPassword);
   if (user?.publicId == fromUserPassword[0].publicId) {
      const drop = await userModel.findByIdAndDelete(user?.id);
      await post.deleteMany({
         userId: user?.id,
      });
      await all.friends.deleteMany({
         userId: user?.id,
      });
      await all.notifications.deleteMany({
         userId: user?.id,
      });
      if (drop) res.status(200).json({ done: true });
      else res.status(404).json({ done: false, message: 'User not found!' });
   } else {
      res.status(403).json({ done: false, message: 'Wrong credentials' });
   }
};
