import { Sequelize } from "sequelize";

const connectWithSequelize:any = new Sequelize("jwtVerification", "root", "Root@123", {
    dialect: "mysql",
    host: "localhost"
});

export default connectWithSequelize;