<script lang="ts">
	import ActividadesCrear from '$lib/components/Actividades/ActividadesCrear.svelte';

	const { data } = $props();
	let { usuario } = $state(data);
</script>

<div class="container mx-auto px-4 py-8">
	<ActividadesCrear {usuario} />
</div>
