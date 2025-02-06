<script lang="ts">
	import { onMount } from 'svelte';
	// import ActividadesCrear from '$lib/components/Actividades/ActividadesCrear.svelte';

	const { data } = $props();
	let { actividades } = $state(data);
	let error = '';

	function getEstadoClass(estado: string) {
		switch (estado) {
			case 'Pendiente':
				return 'bg-warning/20 text-warning-content';
			case 'En Progreso':
				return 'bg-info/20 text-info-content';
			case 'Finalizado':
				return 'bg-success/20 text-success-content';
			default:
				return 'bg-neutral/20 text-neutral-content';
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
				<div class="card bg-base-200 shadow-xl">
					<div class="card-body">
						<div class="flex items-start justify-between">
							<h3 class="card-title">{actividad.nombre}</h3>
							<span class={`badge ${getEstadoClass(actividad.estado)}`}>
								{actividad.estado}
							</span>
						</div>
						<p class="text-sm">{actividad.descripcion}</p>
						<div class="text-sm text-gray-500">
							<!-- <p>Inicio: {new Date(actividad.fechaInicio).toLocaleString()}</p> -->
							<!-- <p>Fin: {new Date(actividad.fechaFin).toLocaleString()}</p> -->
						</div>
						<!-- {#if actividad.propuesta}
									<div class="mt-2">
										<span class="text-sm font-medium">Propuesta:</span>
										<a
											href="/propuestas/{actividad.propuesta.id}"
											class="link link-primary text-sm ml-1"
										>
											{actividad.propuesta.nombre}
										</a>
									</div>
								{/if} -->
						<div class="card-actions mt-4 justify-end">
							<a href="/actividades/{actividad.id}" class="btn btn-primary btn-sm">
								Ver Detalles
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
