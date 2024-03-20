import mongoose from "mongoose";
import cors from 'cors';
import express from "express";
import bodyParser from 'body-parser';
import config from"./config.js";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import orderRoutes from './routes/orderRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import cookieParser from 'cookie-parser';
import cloudinary  from "cloudinary";


//database connection:

const DB_Connection_String = process.env.DATABASE_CONNECTION_STRING.replace(
    "<mongodb_user>",
    process.env.DATABASE_USERNAME
).replace(
    "<mongodb_password>",
    process.env.DATABASE_PASSWORD 
)

mongoose.set("strictQuery",false)
mongoose.connect(DB_Connection_String).then(con=> console.log("Database connection established....."))

const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/productsDetails",productRouter);
app.use('/api/orders', orderRoutes);
app.use(paymentRoutes);

//cloudinary logic:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`listening on ${port}...`))
