const express = require("express");
const app = express();
const port = process.env.EXPRESSPORT;
app.use(express.json());
app.enable("trust proxy");
app.use(express.urlencoded({extended:true}));
app.listen(port, ()=>console.log(`Express is listening on port ${port}`));


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");


const cors = require("cors");
const corsOptions = {
    origin: process.env.CORS_URL.split(", "),
    credentials: true,
};
app.use(cors(corsOptions));


const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
const redisClient = createClient({ legacyMode: true, url: process.env.REDIS_URL, });
redisClient.connect().catch(console.error);
redisClient.on('connect', (_err) => console.log('Redis connected'));
const mySession = session({
    key: "sessionCookie",
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: false,
        httpOnly: false,
        maxAge: 300000 * 9000 * 9000,
        },
    },
);
app.use(mySession);


const mongoose = require("mongoose");
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const connectToMongooseDB = () => {
    mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@mongo:27017/?authSource=admin`)
    .then(()=>console.log("MongoDB connected"))
    .catch((e)=>{console.log(e); setTimeout(connectToMongooseDB, 3000)});
};
connectToMongooseDB();


app.route("/api/v1").get((_req,res) => res.send("<h1>BMG, Hello My Friend. This is a test.</h1>"));
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);


const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.route('/*').get((req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));


module.exports = app;