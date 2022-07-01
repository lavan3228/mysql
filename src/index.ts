import express, { Application } from "express";
import authorrouter from "./routes/authorRoute";
import bookrouter from "./routes/bookRoute";
import userrouter from "./routes/userRoute";
import connectWithSequelize from "./db/conn";
import bodyParser from "body-parser";

const app: Application = express();
const port: number = 4001;

app.use(express.json());
app.use(bodyParser.json());

connectWithSequelize
    .sync()
    .then((result: any)=>{
      console.log("DB CONNECTED");
    })
    .catch((error: any)=>{
      console.log(error)
});


app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`)
});

app.use("/user", userrouter);
app.use("/author", authorrouter);
app.use("/book", bookrouter);
