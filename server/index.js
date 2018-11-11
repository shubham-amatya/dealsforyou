require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
require("./shared/connect-mongo").connecMongo();

require("./crawlers/adayroi/adayroi.index").adayroi();
require("./crawlers/tiki/tiki.index").tiki();
setInterval(() => {
    require("./crawlers/adayroi/adayroi.index").adayroi();
    require("./crawlers/tiki/tiki.index").tiki();
}, 3600000);

const itemRoutes = require("./routes/item.routing");
const userRoutes = require("./routes/user.routing");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", express.static(path.join(__dirname, "client")));


app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/user", userRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || 8000, function() {
    console.log("Server is now listening");
});
