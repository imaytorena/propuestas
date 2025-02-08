<script lang="ts">
	import type { PageData } from './$types';
	const { data } = $props();
	
	let { participaciones }: PageData = $derived(data);
</script>

<div class="container mx-auto py-4">
	{#if participaciones?.length === 0}
		<div class="py-8 text-center">
			<p class="text-gray-500">No hay registros de participación</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
			{#each participaciones as participacion}
				<div class="container flex flex-col gap-1 items-start w-full rounded-lg bg-base-100 p-4 shadow-lg">
					<div class="flex items-center gap-2">
						<div class="font-bold text-lg">{participacion.nombre}</div><i> ({participacion.tipo})</i>
					</div>
					<div class="w-full flex flex-grow justify-between items-start gap-2">
						<p>{participacion.descripcion}</p>
						<span class="text-gray-500 self-end">{new Date(participacion.createdAt).toLocaleDateString('es-MX')}</span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
