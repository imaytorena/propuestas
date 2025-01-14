<script lang="ts">
	import { onMount } from 'svelte';
	// import * as m from '$lib/paraglide/messages.js';
	// import EvaluacionGrafico from '$lib/components/EvaluacionGrafico.svelte';
	// import EvaluacionBadge from '$lib/components/EvaluacionBadge.svelte';
	import CategoriaBadge from '$lib/components/CategoriaBadge.svelte';
	import type { Propuesta } from '$lib/types';

	const { data } = $props();
	// console.log(data)
	let propuestas: Propuesta[] = $state(data.propuestas);
	let error = '';

	onMount(async () => {
		// try {
		//   propuestas = await get('/api/propuestas');
		// } catch (e) {
		//   error = 'Error al cargar propuestas';
		// }
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

<div class="container mx-auto px-4 py-8">
	<div class="flex justify-between items-center mb-6">
		<div class="flex flex-col items-start">
			<h2 class="text-3xl font-bold mb-2">Propuestas</h2>
			<p class="text-sm">La comunidad estudiantil busca estudiantes que vuelvan realidad las ideas</p>
		</div>
		<a
			href="/propuestas/nueva"
			class="btn btn-primary text-white px-4 py-2 rounded-md transition-colors"
		>
			Crear una propuesta
		</a>
	</div>

	{#if error}
		<p class="text-red-500 mb-4">{error}</p>
	{/if}

	<div class="grid grid-cols-1 gap-6">
		{#each propuestas as propuesta (propuesta.id)}
			<a class="group" href="/propuestas/{propuesta.id}">
				<div class="bg-base-100 rounded-lg shadow-md p-6 hover:shadow-lg hover:cursor-pointer transition-shadow">
					<div class="flex gap-4 flex-wrap-reverse justify-between self-start">
						<div class="max-w-80">
							<h2 class="group-hover:text-primary text-xl font-semibold mb-2 text-black">
								{propuesta.nombre}
							</h2>
							<p class="text-black mb-4">{propuesta.descripcion}</p>
						</div>
						<div class="flex flex-col items-center">
            <span class="px-3 py-1 rounded-full text-sm font-medium {getEstadoClass(propuesta.estado)}">
              {propuesta.estado}
            </span>
							<!--            <div class="mt-2">-->
							<!--              <EvaluacionBadge evaluacion={propuesta.evaluacion} />-->
							<!--            </div>-->
						</div>
					</div>
					<div class="flex flex-wrap mb-4">
						{#each propuesta.categorias as categoria}
							<CategoriaBadge categoria={categoria.nombre} />
						{/each}
					</div>
					<div class="flex justify-between items-center mt-4 text-sm text-neutral/70">
						<div class="flex gap-1 items-end justify-end">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/><path fill="currentColor" d="M2.728 5.818a.75.75 0 1 0-1.455.364l.382 1.528a8.21 8.21 0 0 0 5.595 5.869v4.473c0 .898 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.595.08 1.344.08 2.242.08h.104c.899 0 1.648 0 2.243-.08c.627-.084 1.194-.27 1.65-.726s.64-1.022.725-1.65c.08-.594.08-1.344.08-2.242v-4.193a2.62 2.62 0 0 1 1.856 2.208l.65 5.52a.75.75 0 0 0 1.489-.175l-.65-5.52A4.124 4.124 0 0 0 16 12.25H8.085A6.71 6.71 0 0 1 3.11 7.346z"/></svg>
							<span>1/5</span>
						</div>
						{#if (!!propuesta?.fechaEntrega)}
							<div class="flex items-center justify-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
									<g fill="none" stroke="currentColor" stroke-width="1.5">
										<path
											d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z" />
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