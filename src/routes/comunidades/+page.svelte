<script lang="ts">
	import ComunidadCard from '$lib/components/Comunidades/ComunidadCard.svelte';
	import Tab from '$lib/components/Tab.svelte';
	import type { PageData } from './$types';

	const { data } = $props();
	let { comunidades = [] }: PageData = $state(data);
	let error = '';
	let showCreateModal = false;
	let checked = $state('populares');
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-gray-900">Comunidades</h1>
			<p class="mt-2 text-gray-600">Descubre comunidades basadas en intereses compartidos</p>
		</div>
	</div>
<div role="tablist" class="tabs tabs-lifted">
	<Tab label="Populares" group="comunidades_group" id="populares" bind:value={checked}>
		<div class="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each comunidades as comunidad (comunidad.id)}
				<ComunidadCard {comunidad} />
			{/each}
		</div>
	</Tab>

	<Tab label="Zona Metropolitana de Guadalajara" group="comunidades_group" id="geografia" bind:value={checked}>
    <div class="container mx-auto px-4 py-8">
      <div class="h-screen">Geografia</div>
    </div>
  </Tab>

	<Tab label="Centros universitarios" group="comunidades_group" id="universidad" bind:value={checked}>
    <div class="container mx-auto px-4 py-8">
      <div class="h-screen">Universidad</div>
    </div>
  </Tab> 

	<Tab label="..." group="comunidades_group" id="otros" bind:value={checked}>
    <div class="container mx-auto px-4 py-8">
      <div class="h-screen">Universidad</div>
    </div>
  </Tab>
</div>

	{#if error}
		<div class="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
			{error}
		</div>
	{/if}
</div>
