<script lang="ts">
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';

	const { data } = $props();
	let { actividades } = $state(data);
	let loading : { bar: boolean } = getContext('loading');

	$effect(() => {
		loading.bar = actividades === undefined;
	})
	
	function getEstadoClass(estado: string) {
		switch (estado) {
			case 'Iniciado':
				return 'bg-neutral/40 text-white';
			case 'En Progreso':
				return 'bg-neutral/60 text-white';
			case 'Finalizado':
				return 'bg-neutral/80 text-white';
			default:
				return 'bg-neutral/60 text-white';
		}
	}
</script>

<div class="container mx-auto px-4 py-8">
	{#if actividades.length === 0}
		<div class="py-8 text-center">
			<p class="text-gray-500">No hay actividades registradas</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each actividades as actividad}
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex items-start justify-between">
							<h3 class="card-title">{actividad.nombre}</h3>
							<span class={`${getEstadoClass(actividad.estado)} p-2 px-4 rounded-full`}>
								{actividad.estado}
							</span>
						</div>
						<p class="text-sm">{actividad.descripcion}</p>
						<div class="text-sm text-gray-500">
							<!-- <p>Inicio: {new Date(actividad.fechaInicio).toLocaleString()}</p> -->
							<!-- <p>Fin: {new Date(actividad.fechaFin).toLocaleString()}</p> -->
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
