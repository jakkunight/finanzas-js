const pool = require("../db.js");
const express = require("express");

// Controladores:
const leerDatos = async (req, res) => {
	try{
		const meses = (await pool.query("SELECT * FROM meses"))[0];
		const tipos_gasto = (await pool.query("SELECT * FROM tipos_gasto"))[0];
		const tipos_ingreso = (await pool.query("SELECT * FROM tipos_ingreso"))[0];
		const concepto_ingresos = (await pool.query("SELECT * FROM concepto_ingresos"))[0];
		const concepto_gastos = (await pool.query("SELECT * FROM concepto_gastos"))[0];
		return res.json(JSON.stringify({
			meses,
			tipos_gasto,
			tipos_ingreso,
			concepto_gastos,
			concepto_ingresos
		}));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
};
const leerPresupuestos = async (req, res) => {
	try{
		const ingresos = (await pool.query("SELECT * FROM presupuesto_ingresos"))[0];
		const gastos = (await pool.query("SELECT * FROM presupuesto_gastos"))[0];
		return res.json(JSON.stringify({
			gastos,
			ingresos
		}));
	}catch(e){
		console.error(e);
		return res.sendStatus(400);
	}
};

module.exports = {
	leerDatos,
	leerPresupuestos
};