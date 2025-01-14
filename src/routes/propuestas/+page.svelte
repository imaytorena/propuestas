<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import EvaluacionGrafico from '$lib/components/EvaluacionGrafico.svelte';
	import EvaluacionBadge from '$lib/components/EvaluacionBadge.svelte';
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
						<div class="flex items-center">
							<svg
								class="w-4 h-4 mr-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							1/5
						</div>
						{#if (!!propuesta?.fechaEntrega)}
							<div class="flex items-center">
								<svg
									class="w-4 h-4 mr-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
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