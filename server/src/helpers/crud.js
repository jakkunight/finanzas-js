const pool = require('../db.js');
const chalk = require('chalk');

const leerTabla = async (tabla) => {
	try{
		const datos = (await pool.query("SELECT * FROM " + tabla))[0];
		console.log(chalk.blueBright("[INFO] Se leyeron los datos de '" + tabla + "'"));
		return datos;
	}catch(e){
		console.error(chalk.redBright(e));
		return;
	}
};

const insertarFila = async (tabla, fila) => {
	try{
		const resultado = (await pool.query("INSERT INTO " + tabla + " SET ?", [ fila ]))[0];
		console.log(chalk.greenBright("[INFO] Se insertaron datos en '" + tabla + "'"));
		return resultado;
	}catch(e){
		console.error(chalk.redBright(e));
		return;
	}
};

const actualizarFila = async (tabla, nuevaFila, id) => {
	try{
		const result = (await pool.query("UPDATE " + tabla + " SET ? WHERE id = ?", [ nuevaFila, id ]))[0];
		console.log(chalk.blueBright("[INFO] Se actualizaron los datos de '" + tabla + "'"));
		return result;
	}catch(e){
		console.error(chalk.redBright(e));
		return;
	}
};



/* leerTabla("ingresos")
.then(datos => console.log(datos))
.catch(e => console.error(chalk.redBright(e)));
leerTabla("concepto_ingresos")
.then(datos => console.log(datos))
.catch(e => console.error(chalk.redBright(e))); */

module.exports = {
	leerTabla,
	insertarFila,
	actualizarFila
};