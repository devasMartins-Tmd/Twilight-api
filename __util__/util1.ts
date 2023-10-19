import jsonWebToken from 'jsonwebtoken';
const { sign } = jsonWebToken;
require('dotenv').config({ path: '../.env' });
import * as path from 'fs';
import { Request } from 'express';
import mongoose from 'mongoose';
// *************************************************************************************
type credentialType = {
   name?: string;
   email: string;
   tag?: string;
   password: string;
};
export function verifyCredentials(credentials: credentialType, action: 'Login' | 'Signup') {
   if (action === 'Login' && credentials.email && credentials.password) return true;
   if ((action === 'Signup' && credentials.name && credentials.email && credentials.password && credentials.tag === '1') || '0')
      return true;
   return false;
}
// ****************************************************************************************
/**
 * JWToken: return a string token (expires in 30d)
 * @id: payload encrypted in token
 * @return: string
 */
export function JWToken(id: string) {
   return sign({ id }, process.env.SECRET || '++++===++++', { expiresIn: '30d' });
}
// ****************************************************************************************

/**
 * unique id
 */
export function uniqueID() {
   return '0x' + Math.random().toString(32).substring(3, 6);
}

/**
 * fileExist: check if file is present is a path
 */
export function fileExist(file: string) {
   let folder = path.readdirSync('./');
   return folder.indexOf(file);
}

/**
 * timeFrame: returns an array of times
 */

export function timeFrame() {
   let date = new Date();
   let [hour, minute, second, millisec] = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
   return `${hour}:${minute}:${second}:${millisec}`;
}

/**
 * filterObject
 */

export const filterObject: any = function (info: any) {
   let key = Object.keys(info),
      realHash: any = {},
      res: any = {};
   key.forEach((item) => {
      if (item === 'img') {
         res[item] = info[item];
      } else {
         if (info[item]) {
            if (item === 'newPassword') realHash['password'] = info[item];
            else realHash[item] = info[item];
         }
         res['info'] = realHash;
      }
   });
   return res;
};

export const MakeImage = function (img: any, name: string) {
   let buffer: Buffer = Buffer.from(img.split(';base64,')[1], 'base64');
   let fileName = `IMG/${name}.${Math.floor(Math.random() * 100)}.profile.webp`.replace(' ', '');
   path.writeFileSync(fileName, buffer);
   let isDone = fileExist(fileName);
   return [isDone, fileName];
};

/**
 * getId: Function (get id from jwt token)
 */
export const getId = (req: Request) => {
   let tokenId: any = jsonWebToken.decode(req.headers.authorization || '');
   tokenId = tokenId['id'];
   return tokenId;
};

export const notifyMessage = (id: mongoose.Types.ObjectId | undefined, text: string, type: string) => {
   return {
      text,
      type,
      userId: id,
   };
};

export const assetFolder = ['FarmHub_User_Post_Img', 'FarmHub_User_Profile_Img'];
