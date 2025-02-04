<script>
	import Tab from '$lib/components/Participacion/Tab.svelte';
	import PropuestaCard from '$lib/components/Propuestas/PropuestaCard.svelte';

	let checked = $state('1');
</script>

<div role="tablist" class="tabs tabs-lifted">
	<Tab label="Populares" group="tabs_group" id="1" bind:value={checked}>
		<PropuestaCard />
	</Tab>
	<Tab label="Propuestas" group="tabs_group" id="2" bind:value={checked}>
		<PropuestaCard />
		<PropuestaCard />
		<PropuestaCard />
	</Tab>
	<Tab label="Actividades" group="tabs_group" id="3" bind:value={checked}>
		{#each [1, 2, 3] as actividad}
			<div class="card m-4 h-[50px] w-[50px] bg-base-100">Acitvidad {actividad}</div>
		{/each}
	</Tab>
</div>
