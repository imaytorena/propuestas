<script lang="ts">
	import IdeaCard from '$lib/components/Ideas/IdeaCard.svelte';
	import IdeasCrear from '$lib/components/Ideas/IdeasCrear.svelte';
	import type { Idea } from '$lib/types';

	const { data } = $props();
	let ideas: Idea[] = $state(data.ideas);

	function toggleHistory(idea: Idea) {
		ideas = ideas.map(i => ({
			...i,
			showingHistory: i.id === idea.id ? !i.showingHistory : false,
			editing: false
		}));
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-12">
		<h2 class="text-4xl font-bold text-primary mb-4">Ideas...</h2>
		<h3 class="text-3xl font-bold text-base-content mb-4">¿Tienes una idea que debería conocer nuestra comunidad
			universitaria?</h3>
		<p class="text-xl text-base-content/80 w-2xl  mx-auto mb-8">
			Queremos compartir propuestas enfocadas en las necesidades y deseos de los estudiantes de la UDG.
		</p>
		<IdeasCrear {ideas} />
	</div>

	<!--  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">-->
	<!--    {#each ideas as idea}-->
	<!--      <IdeaCard {idea} />-->
	<!--    {/each}-->
	<!--  </div>-->

	<div class="relative">
		<div class="overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar">
			<div class="flex gap-4 px-4">
				{#each ideas.slice(0, 6) as idea}
					<div class="snap-start shrink-0 w-[300px]">
						<IdeaCard {idea} />
					</div>
				{/each}

				<!-- "Ver más" card -->
				<div class="snap-start shrink-0 w-[300px]">
					<a href="/ideas" class="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow">
						<div class="card-body items-center justify-center text-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none"
									 viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
							<h3 class="text-xl font-semibold text-primary">Ver más ideas</h3>
							<p class="text-base-content/70">Explora todas las ideas de la comunidad</p>
						</div>
					</a>
				</div>
			</div>
		</div>

		<!-- Scroll indicators -->
		<div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
			{#each Array(Math.min(4, ideas.length + 1)) as _, i}
				<button
					class="w-2 h-2 rounded-full transition-colors duration-200"
					class:bg-primary={i === 0}
					class:bg-base-300={i !== 0}
				></button>
			{/each}
		</div>
	</div>
</div>

<style>
    .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
