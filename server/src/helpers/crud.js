const pool = require('../db.js');

// Funciones CRUD:
const crud = {};

crud.leerTabla = async (
	{
		tabla = "",
	}
) => {
	if(!tabla){
		console.log("[ERROR] No se especificó una tabla para consultar.");
		throw new Error("[ERROR] No se especificó una tabla para consultar.");
	}
	try{
		const datos = (await pool.query(`SELECT * FROM ${tabla}`))[0];
		console.log(`[INFO] Se leyó/leyeron ${datos.length} fila/filas de '${tabla}'`);
		return datos;
	}catch(e){
		console.error(e);
		return e;
	}
};

crud.encontrarFila = async (
	{
		tabla = "",
		parametros = {
			id: 0
		}
	}
) => {
	if(!tabla){
		console.log("[ERROR] No se especificó una tabla para consultar.");
		throw new Error("[ERROR] No se especificó una tabla para consultar.");
	}
	if(!parametros || parametros.id <= 0){
		console.log("[ERROR] No se especificó al menos un parámetro de búsqueda.");
		throw new Error("[ERROR] No se especificó al menos un parámetro de búsqueda.");
	}
	try{
		let condiciones = "";
		let entradas = Object.entries(parametros);
		entradas.forEach((entrada, i) => {
			condiciones += `${entrada[0]} = ${entrada[1]}`;
			if(i < entradas.length - 1){
				condiciones += " AND ";
			}
		});
		const datos = (await pool.query(`SELECT * FROM ${tabla} WHERE ${condiciones} ORDER BY id`))[0];
		console.log(`[INFO] Se encontró/encontraron ${datos.length} fila/filas de '${tabla}'`);
		return datos;
	}catch(e){
		console.error(e);
		return e;
	}
};

crud.encontrarFila({
	tabla: "ingresos",
	parametros: {
		tipo: 2,
		concepto: 1
	}
}).then(datos => console.table(datos));

module.exports = crud;