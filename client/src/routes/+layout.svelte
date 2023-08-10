<script>
	import { onMount } from "svelte";
	import { concepto_gastos, concepto_ingresos, tipos_gasto, tipos_ingreso, meses } from "$lib/stores.js";
	
	const obtenerDatos = async () => {
		try{
			const res = await fetch("http://localhost:3000/datos", {
				method: "GET",
				mode: "cors",
				headers: {
					"Access-Control-Allow-Origin": "*"
				}
			});
			const data = JSON.parse(await res.json());
			concepto_gastos.set(data.concepto_gastos);
			concepto_ingresos.set(data.concepto_ingresos);
			tipos_gasto.set(data.tipos_gasto);
			tipos_ingreso.set(data.tipos_ingreso);
			meses.set(data.meses);
			console.table(data.concepto_gastos);
			console.table(data.concepto_ingresos);
			console.table(data.tipos_gasto);
			console.table(data.tipos_ingreso);
			console.table(data.meses);
			return;
		}catch(e){
			console.error(e);
			return;
		}
	};
	onMount(() => {
		obtenerDatos();
	});
</script>
<header>
	<h3>Finanzas-JS</h3>
	<nav>
		<ul>
			<li>
				<a href="/presupuestos">Presupuestos</a>
			</li>
			<li>
				<a href="/registros">Registros</a>
			</li>
		</ul>
	</nav>
</header>
<main>
	<slot></slot>
</main>
<footer>
	<a href="/">Volver al inicio</a>
</footer>