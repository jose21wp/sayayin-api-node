import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  role?: string;
  createdAt: Date;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'sayayin', 'viewer'],
      default: 'sayayin'
    }
  },
  {
    timestamps: true
  }
);

const UserModel = model<User>('User', UserSchema);
export default UserModel;