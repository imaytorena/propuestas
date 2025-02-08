<script lang="ts">
	// import * as m from '$lib/paraglide/messages.js';
	// import EvaluacionGrafico from '$lib/components/EvaluacionGrafico.svelte';
	// import EvaluacionBadge from '$lib/components/EvaluacionBadge.svelte';
	import CategoriaBadge from '$lib/components/CategoriaBadge.svelte';
	import { getContext } from 'svelte';
	const { data } = $props();
	
	let { propuestas } = $derived(data);
	let loading : { bar: boolean } = getContext('loading');

	$effect(() => {
		loading.bar = propuestas === undefined;
	});

	function getEstadoClass(estado: string) {
		switch (estado) {
			case 'Iniciando':
				return 'bg-warning/20 text-warning-content';
			case 'En Progreso':
				return 'bg-info/20 text-info-content';
			case 'Finalizado':
				return 'bg-success/20 text-success-content';
			default:
				return 'bg-neutral/20 text-neutral-content';
		}
	}

	function getEstadoText(estado: string) {
		switch (estado) {
			case 'pendiente':
				return 'Iniciando';
			case 'en_progreso':
				return 'En Progreso';
			case 'finalizado':
				return 'Finalizado';
			default:
				return estado;
		}
	}

	// function getEvaluacionLabel(evaluacion: { buena: number, regular: number, mala: number }) {
	//   const total = evaluacion.buena + evaluacion.regular + evaluacion.mala;
	//   if (total === 0) return 'Sin evaluaciones';
	//
	//   const max = Math.max(evaluacion.buena, evaluacion.regular, evaluacion.mala);
	//   if (max === evaluacion.buena) return 'Buena';
	//   if (max === evaluacion.regular) return 'Regular';
	//   return 'Mala';
	// }
</script>

{#if !propuestas || propuestas.length === 0}
	<div class="py-8 text-center">
		<p class="text-gray-500">No hay propuestas registradas</p>
	</div>
{:else}
	<div class="container mx-auto px-4 py-8">
		<div class="grid grid-cols-1 gap-6">
			{#each propuestas as propuesta (propuesta.id)}
				<a class="group" href="/actividades/{propuesta.id}">
					<div
						class="rounded-lg bg-base-100 p-6 shadow-md transition-shadow hover:cursor-pointer hover:shadow-lg"
					>
						<div class="flex flex-wrap-reverse justify-between gap-4 self-start">
							<div class="max-w-80">
								<h2 class="mb-2 text-xl font-semibold text-black group-hover:text-primary">
									{propuesta.nombre}
								</h2>
								<p class="mb-4 text-black">{propuesta.descripcion}</p>
							</div>
							<div class="flex flex-col items-center">
								<span
									class="rounded-full px-3 py-1 text-sm font-medium {getEstadoClass(
										propuesta.estado
									)}"
								>
									{propuesta.estado}
								</span>
								<!--            <div class="mt-2">-->
								<!--              <EvaluacionBadge evaluacion={propuesta.evaluacion} />-->
								<!--            </div>-->
							</div>
						</div>
						<div class="mb-4 flex flex-wrap">
							{#each ['categoria 1', 'categoria 2', 'categoria 3'] as categoria}
								<CategoriaBadge {categoria} />
							{/each}
						</div>
						<div class="mt-4 flex items-center justify-between text-sm text-neutral/70">
							<div class="flex items-end justify-end gap-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
									><path fill="currentColor" d="M12 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8" /><path
										fill="currentColor"
										d="M2.728 5.818a.75.75 0 1 0-1.455.364l.382 1.528a8.21 8.21 0 0 0 5.595 5.869v4.473c0 .898 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.595.08 1.344.08 2.242.08h.104c.899 0 1.648 0 2.243-.08c.627-.084 1.194-.27 1.65-.726s.64-1.022.725-1.65c.08-.594.08-1.344.08-2.242v-4.193a2.62 2.62 0 0 1 1.856 2.208l.65 5.52a.75.75 0 0 0 1.489-.175l-.65-5.52A4.124 4.124 0 0 0 16 12.25H8.085A6.71 6.71 0 0 1 3.11 7.346z"
									/></svg
								>
								<span>1/5</span>
							</div>
							{#if !!propuesta?.fechaEntrega}
								<div class="flex items-center justify-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
									>
										<g fill="none" stroke="currentColor" stroke-width="1.5">
											<path
												d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
											/>
											<path stroke-linecap="round" d="M7 4V2.5M17 4V2.5" />
											<circle cx="16.5" cy="16.5" r="1.5" />
											<path stroke-linecap="round" d="M2.5 9h19" />
										</g>
									</svg>
									<span>{`Entrega : ${propuesta.fechaEntrega.toLocaleDateString()}`}</span>
								</div>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}
