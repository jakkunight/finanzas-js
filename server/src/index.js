const express = require("express");

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

server.use(cors({
	optionsSuccessStatus: 204,
	origin: [
		"localhost:*"
	]
}));
server.use(cookieParser());
server.use(fileupload());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: true
}));

// Routers:
const index = require("./routes/index.js");
server.use(index);

// Inicio del servidor:
server.listen(server.get("port"), () => {
	console.log("[INFO] Server on port", server.get("port"));
});