const express = require("express");
const chlk = require('chlk');

// Instancia del servidor HTTP:
const server = express();

// Configuración:
const dotenv = require("dotenv");
dotenv.config();
server.set("port", process.env.PORT || 3000);

// Middlewares:
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');
const chalk = require("chalk");

server.use(cors({
	optionsSuccessStatus: 204,
	origin: "*"
}));
server.use(cookieParser());
server.use(fileupload());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: true
}));

// Routers:


// Inicio del servidor:
server.listen(server.get("port"), () => {
	console.log(chalk.greenBright("[INFO] Server on port"), chalk.greenBright(server.get("port")));
});