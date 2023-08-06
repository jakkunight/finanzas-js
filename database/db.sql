-- Base de Datos:
CREATE DATABASE IF NOT EXISTS finanzas_js;
USE finanzas_js;

-- Tablas:
CREATE TABLE IF NOT EXISTS meses(
	id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	mes VARCHAR(15) NOT NULL
);
CREATE TABLE IF NOT EXISTS tipos_gasto(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo TEXT NOT NULL,
	descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tipos_ingreso(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo TEXT NOT NULL,
	descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS concepto_gastos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	concepto TEXT NOT NULL,
	descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS concepto_ingresos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	concepto TEXT NOT NULL,
	descripcion TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS gastos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo INT NOT NULL,
	concepto INT NOT NULL,
	monto DECIMAL(13, 2) NOT NULL,
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE)
);
CREATE TABLE IF NOT EXISTS ingresos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo INT NOT NULL,
	concepto INT NOT NULL,
	monto DECIMAL(13, 2) NOT NULL,
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE)
);
CREATE TABLE IF NOT EXISTS presupuesto_gastos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo INT NOT NULL,
	concepto INT NOT NULL,
	monto DECIMAL(13, 2) NOT NULL,
	mes INT NOT NULL
);
CREATE TABLE IF NOT EXISTS presupuesto_ingresos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo INT NOT NULL,
	concepto INT NOT NULL,
	monto DECIMAL(13, 2) NOT NULL,
	mes INT NOT NULL
);