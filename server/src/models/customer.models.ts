import { DataTypes, Model, Sequelize } from "sequelize";

interface CustomerAttributes {
  id: number;
  user_name: string;
  debit_card: string;
  email: string;
  password: string;
  created_at: Date;
}

const CustomerModel = (sequelize: Sequelize) => {
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

export default CustomerModel;
