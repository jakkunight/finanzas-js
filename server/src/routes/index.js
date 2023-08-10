// Instancia del router:
const express = require('express');
const router = express.Router();

// Controladores:
const index = require("../controllers/index.js");

// Configuración de las rutas:
router.get("/", async (req, res) => {
	try{
		res.sendStatus(200);
	}catch(error){
		console.error(error);
		res.sendStatus(400);
	}
});
router.get("/datos", index.leerDatos);
router.get("/presupuestos", index.leerPresupuestos);

module.exports = router;