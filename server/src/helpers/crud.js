const pool = require('../db.js');
const chalk = require('chalk');

// Funciones CRUD:
async function leerTabla(tabla) {
	try {
		const datos = (await pool.query("SELECT * FROM " + tabla))[0];
		console.log(chalk.blueBright("[INFO] Se leyeron los datos de '" + tabla + "'"));
		return datos;
	} catch (e) {
		console.error(chalk.redBright(JSON.stringify(e)));
		return;
	}
}

async function insertarFila(tabla, fila) {
	try {
		const resultado = (await pool.query("INSERT INTO " + tabla + " SET ?", [fila]))[0];
		console.log(resultado);
		console.log(chalk.greenBright("[INFO] Se insertaron datos en '" + tabla + "'"));
		return resultado;
	} catch (e) {
		console.error(chalk.redBright(JSON.stringify(e)));
		return;
	}
}

async function actualizarFila(tabla, nuevaFila, id) {
	try {
		const result = (await pool.query("UPDATE " + tabla + " SET ? WHERE id = ?", [nuevaFila, id]))[0];
		console.log(chalk.blueBright("[INFO] Se actualizaron los datos de '" + tabla + "' en la fila '" + id + "'"));
		return result;
	} catch (e) {
		console.error(chalk.redBright(JSON.stringify(e)));
		return;
	}
}

async function borrarFila(tabla, id) {
	try {
		const result = (await pool.query("DELETE FROM " + tabla + " WHERE id = ?", [id]))[0];
		console.log(chalk.blueBright("[INFO] Se eliminaron datos de '" + tabla + "' en la fila '" + id + "'"));
		return result;
	} catch (e) {
		console.error(chalk.redBright(JSON.stringify(e)));
		return;
	}
}

// Funciones adicionales:
async function encontrarFila({ tabla, campo = "id", valor = 1 } = {}) {
	try {
		return true;
	} catch (e) {
		console.error(chalk.redBright(JSON.stringify(e)));
		return false;
	}
}

encontrarFila()

module.exports = {
	leerTabla,
	insertarFila,
	actualizarFila,
	borrarFila
};