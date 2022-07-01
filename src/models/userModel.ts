import * as Sequelize from 'sequelize';
import connectWithSequelize from "../db/conn";

let User = connectWithSequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mail:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    },
    },
    {
        freezeTableName:true,
        timestamps:false
    })


export default User;
