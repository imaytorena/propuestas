<script lang="ts">
	import IdeaCard from '$lib/components/Ideas/IdeaCard.svelte';
	import IdeasCrear from '$lib/components/Ideas/IdeasCrear.svelte';
	import type { Idea } from '$lib/types';
	import { getContext } from 'svelte';
	const { data } = $props();

	let { ideas } = $derived(data);
	let loading : { bar: boolean } = getContext('loading');

	$effect(() => {
		loading.bar = ideas === undefined;
	})
	

	// function toggleHistory(idea: Idea) {
	// 	ideas = ideas.map((i) => ({
	// 		...i,
	// 		showingHistory: i.id === idea.id ? !i.showingHistory : false,
	// 		editing: false
	// 	}));
	// }
</script>

<div class="container mt-4 mx-auto p-4">
	<IdeasCrear {ideas} />
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each ideas as idea}
		<IdeaCard {idea} />
		{/each}
	</div>
</div>
	