// Instancia del router:
const express = require('express');
const router = express.Router();

// Configuración de las rutas:
router.get("/", async (req, res) => {
	try{
		res.sendStatus(200);
	}catch(error){
		console.error(error);
		res.sendStatus(400);
	}
});

module.exports = router;