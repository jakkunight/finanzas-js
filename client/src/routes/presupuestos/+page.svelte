<script>
    import { onMount } from "svelte";

	let gastos = [];
	let ingresos = [];

	import { concepto_gastos, concepto_ingresos, tipos_gasto, tipos_ingreso, meses } from "$lib/stores.js";

	let data = {
		cg: [],
		ci: [],
		tg: [],
		ti: [],
		m: []
	};

	concepto_gastos.subscribe((v) => {
		data.cg = v;
	});
	concepto_ingresos.subscribe((v) => {
		data.ci = v;
	});
	tipos_gasto.subscribe((v) => {
		data.tg = v;
	});
	tipos_ingreso.subscribe((v) => {
		data.ti = v;
	});
	meses.subscribe((v) => {
		data.m = v;
	});

	const obtenerPresupuestos = async () => {
		try{
			let headers = new Headers();
			headers.append("Access-Control-Allow-Origin", "*");
			let response = await fetch("http://localhost:3000/presupuestos", {
				method: "GET",
				mode: "cors",
				headers
			});
			const presupuestos = JSON.parse(await response.json());
			console.table(presupuestos.gastos);
			console.table(presupuestos.ingresos);
			gastos = presupuestos.gastos;
			ingresos = presupuestos.ingresos;
			return;
		}catch(e){
			console.error(e);
			return;
		}
	}
	onMount(() => {
		obtenerPresupuestos();
	});
</script>
<h1>Presupuestos</h1>
<section>
	<h2>Gastos</h2>
	<table border="1px">
		<thead>
			<th>ID</th>
			<th>Concepto</th>
			<th>Tipo</th>
			<th>Monto (PYG)</th>
			<th>Mes</th>
		</thead>
		<tbody>
			{#if gastos}
				{#each gastos as gasto}
					<tr>
						<td>{gasto.id}</td>
						<td>{data.cg.find((e) => e.id == gasto.concepto)?.concepto}: {data.cg.find((e) => e.id == gasto.concepto)?.descripcion}</td>
						<td>{data.tg.find((e) => e.id == gasto.tipo)?.tipo}: {data.tg.find((e) => e.id == gasto.tipo)?.descripcion}</td>
						<td>{gasto.monto}</td>
						<td>{data.m.find((e) => e.id == gasto.mes)?.mes}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</section>
<section>
	<h2>Ingresos</h2>
	<table border="1px">
		<thead>
			<th>ID</th>
			<th>Concepto</th>
			<th>Tipo</th>
			<th>Monto (PYG)</th>
			<th>Mes</th>
		</thead>
		<tbody>
			{#if ingresos}
				{#each ingresos as ingreso}
					<tr>
						<td>{ingreso.id}</td>
						<td>{data.ci.find((e) => e.id == ingreso.concepto)?.concepto}: {data.ci.find((e) => e.id == ingreso.concepto)?.descripcion}</td>
						<td>{data.ti.find((e) => e.id == ingreso.tipo)?.tipo}: {data.ti.find((e) => e.id == ingreso.tipo)?.descripcion}</td>
						<td>{ingreso.monto}</td>
						<td>{data.m.find((e) => e.id == ingreso.mes)?.mes}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</section>