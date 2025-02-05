<script lang="ts">
	import PropuestasCrear from '$lib/components/Propuestas/PropuestasCrear.svelte';

	const { data } = $props();
	let { usuario } = $state(data);
</script>

<div class="container mx-auto px-4 py-8">
	<PropuestasCrear {usuario} />
</div>
