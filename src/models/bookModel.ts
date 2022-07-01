import * as Sequelize from 'sequelize';
import { INTEGER } from 'sequelize';
import connectWithSequelize from "../db/conn";

let Book = connectWithSequelize.define("Book",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        unique: true,
        allowNull:false,
    },
    AuthorId:{
        type: INTEGER,
        allowNull:false
    },
    rating:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pages: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    },
    {
        freezeTableName:true,
        timestamps:false
    })


export default Book;

