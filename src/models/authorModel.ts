import * as Sequelize from 'sequelize';
import connectWithSequelize from "../db/conn"

let Author = connectWithSequelize.define("Author",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        unique: true,
        allowNull:false
    },
    gender:{
        type:Sequelize.STRING,
        allowNull:false
    },
    birth_place:{
        type: Sequelize.STRING,
        allowNull: false
    },
    },
    {
        freezeTableName:true,
        timestamps:false
    })


export default Author;