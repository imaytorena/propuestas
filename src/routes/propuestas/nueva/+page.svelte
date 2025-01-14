<script lang="ts">
	import PropuestasCrear from '$lib/components/Propuestas/PropuestasCrear.svelte';
</script>

<div class="container mx-auto px-4 py-8">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-3xl font-bold">Nueva Propuesta</h1>
		<a href="/propuestas" class="btn">Volver</a>
	</div>

	<PropuestasCrear />
</div>
