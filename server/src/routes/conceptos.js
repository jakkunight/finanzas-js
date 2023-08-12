const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/conceptos/:clase", async (req, res) => {
	try{
		const tablas = [
			"ingresos",
			"gastos"
		];
		let datos = {
			ingresos: [],
			gastos: []
		};
		if(!req.params.clase || !tablas.includes(req.params.clase)){
			console.error("[ERROR] Bad request");
			return res.sendStatus(404);
		}
		datos[`${req.params.clase}`] = (await pool.query(`SELECT * FROM concepto_${req.params.clase}`))[0];
		console.table(datos);
		return res.json(JSON.stringify(datos[`${req.params.clase}`]));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
});

router.get("/conceptos", async (req, res) => {
	try{
		const tablas = [
			"ingresos",
			"gastos"
		];
		let datos = {
			ingresos: [],
			gastos: []
		};
		if(!req.params.clase || !tablas.includes(req.params.clase)){
			console.error("[ERROR] Bad request");
			return res.sendStatus(404);
		}
		datos.ingresos = (await pool.query(`SELECT * FROM concepto_${tablas[0]}`))[0];
		datos.gastos = (await pool.query(`SELECT * FROM concepto_${tablas[1]}`))[0];
		console.table(datos);
		return res.json(JSON.stringify(datos));
	}catch(e){
		console.error(e);
		return res.sendStatus(404);
	}
});

router.post("/conceptos/:clase", async (req, res) => {
	try{
		const tablas = [
			"ingresos",
			"gastos"
		];
		let resultados = {
			ingresos: [],
			gastos: []
		};
		if(!req.params.clase || !tablas.includes(req.params.clase) || !req.body){
			console.error("[ERROR] Bad request");
			return res.sendStatus(404);
		}
		resultados[`${req.params.clase}`] = (await pool.query(`INSERT INTO concepto_${req.params.clase} SET ?`, [ req.body ]))[0];
		console.table(resultados);
		return res.json(JSON.stringify(resultados[`${req.params.clase}`]));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
});

router.put("/conceptos/:clase", async (req, res) => {
	try{
		const tablas = [
			"ingresos",
			"gastos"
		];
		let resultados = {
			ingresos: [],
			gastos: []
		};
		if(!req.params.clase || !tablas.includes(req.params.clase) || !req.body){
			console.error("[ERROR] Bad request");
			return res.sendStatus(404);
		}
		let {
			id,
			concepto,
			descripcion
		} = req.body;
		const datos = (await pool.query(`SELECT concepto, descripcion FROM concepto_${req.params.clase} WHERE id = ${id}`))[0];
		if(!concepto){
			concepto = datos[0].concepto;
		}
		if(!descripcion){
			descripcion = datos[0].descripcion;
		}
		let nuevosDatos = {
			concepto,
			descripcion
		};
		resultados[`${req.params.clase}`] = (await pool.query(`UPDATE concepto_${req.params.clase} SET ? WHERE id = ?`, [ nuevosDatos, id ]))[0];
		console.table(resultados);
		return res.json(JSON.stringify(resultados[`${req.params.clase}`]));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
});

router.delete("/conceptos/:clase", async (req, res) => {
	try{
		const tablas = [
			"ingresos",
			"gastos"
		];
		let resultados = {
			ingresos: [],
			gastos: []
		};
		if(!req.params.clase || !tablas.includes(req.params.clase) || !req.body){
			console.error("[ERROR] Bad request");
			return res.sendStatus(404);
		}
		resultados[`${req.params.clase}`] = (await pool.query(`DELETE FROM concepto_${req.params.clase} WHERE ?`, [ req.body ]))[0];
		console.table(resultados);
		return res.json(JSON.stringify(resultados[`${req.params.clase}`]));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
});

module.exports = router;