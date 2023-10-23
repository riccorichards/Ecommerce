import { DataTypes, Model, Sequelize } from "sequelize";
import {
  CustomerAttributes,
  UserDocument,
} from "../utils/types/types.customer";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

//model for mysql
export const CustomerModel = (sequelize: Sequelize) => {
  const Customer = sequelize.define<
    Model<CustomerAttributes, CustomerAttributes>
  >("Customer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debit_card: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  });

  return Customer;
};

//model for mongodb (user schema)
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true },
    debit_card: { type: String, required: true },
    bonus: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//before we save the user's docs we are checking user's password
UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  if (!user?.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hash(user?.password, salt);

    user.password = hash;
    return next();
  } catch (error: any) {
    return next(this.errors);
  }
});

UserSchema.methods.comparePass = async function (
  incomingPassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  const validPassword = await bcrypt
    .compare(incomingPassword, user.password)
    .catch(() => false);
  return validPassword;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
