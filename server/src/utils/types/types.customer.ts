import mongoose from "mongoose";

//model for mysql
export interface CustomerAttributes {
  id: number;
  user_name: string;
  debit_card: string;
  email: string;
  password: string;
  created_at: Date;
}
// medel for mongodb... schema's part which could recevied from the client side
export interface UserInput {
  username: string;
  email: string;
  password: string;
  balance: number;
  debit_card: string;
}

//document model for user in mongodb
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  bonus: number;
  comparePass(incomingPassword: string): Promise<boolean>;
}
