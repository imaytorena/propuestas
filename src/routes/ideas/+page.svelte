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
			<h2 class="text-4xl font-bold text-center text-black mb-8">Los estudiantes de la Universidad de Guadalajara dicen qué...</h2>
		<div class="flex justify-between items-center mb-8">
		</div>

		<IdeasCrear {ideas}/>
	</div>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each ideas as idea}
			<IdeaCard {idea} />
		{/each}
	</div>
</div>
