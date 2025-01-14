<script lang="ts">
	import { onMount } from 'svelte';
	import UsuarioCard from '$lib/components/UsuarioCard.svelte';
	// import { get } from '$lib/utils/api';
	// import UsuarioCard from '$lib/components/UsuarioCard.svelte';

	let usuarios = [{
		id: '1',
		nombre: 'Usuario 1',
		email: 'string@email.com',
	},{
		id: '2',
		nombre: 'Usuario 2',
		email: 'string@email.com',
	},{
		id: '3',
		nombre: 'Usuario 3',
		email: 'string@email.com',
	},{
		id: '4',
		nombre: 'Usuario 4',
		email: 'string@email.com',
	},{
		id: '5',
		nombre: 'Usuario 5',
		email: 'string@email.com',
	},{
		id: '6',
		nombre: 'Usuario 6',
		email: 'string@email.com',
	}];
	let error = '';

	onMount(async () => {
		// try {
		// 	usuarios = await get('/api/usuarios');
		// } catch (e) {
		// 	error = 'Error al cargar usuarios';
		// }
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Usuarios</h1>

	{#if error}
		<p class="text-red-500 mb-4">{error}</p>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each usuarios as usuario (usuario.id)}
			<UsuarioCard {usuario} />
		{/each}
	</div>
</div>