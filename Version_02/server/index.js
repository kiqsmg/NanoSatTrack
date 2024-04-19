import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import floripasat1Routes from "./routes/floripasat1.js";


// data imports
import Date from "./models/Date.js";
import Satellite from "./models/Satellite.js";

import {
  dataSatellite,
  dataDate,
} from "./data/index4.js";



/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/floripasat1", floripasat1Routes);


/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ONLY ADD DATA ONE TIME

    //AffiliateStat.insertMany(dataAffiliateStat);
    //OverallStat.insertMany(dataOverallStat);
    //Product.insertMany(dataProduct);
    //ProductStat.insertMany(dataProductStat);
    //User.insertMany(dataUser);
    Date.insertMany(dataDate);
    //Satellite.insertMany(dataSatellite);



}).catch((error) => console.log(`${error} did not connect`));
