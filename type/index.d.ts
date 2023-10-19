import mongoose from 'mongoose';

type userT = {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  uniqueId?: string | undefined;
  tag?: string | undefined;
  id: mongoose.Schema.Types.ObjectId;
  profileImg: string | undefined;
  publicId: string | undefined;
};

interface authBody {
  email: string;
  name: string;
  password: string;
  tag: number;
}
