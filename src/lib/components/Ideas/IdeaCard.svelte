<script lang="ts">
	import Icon from '@iconify/svelte';

	const { idea } = $props();
	let editing: boolean = $state(false);
	let showingHistory: boolean = $state(false);
	let liked: boolean = $state(idea?.liked ?? false);

	type Edicion = {
		id?: number; createdAt: Date; texto: string;
	};

	type Idea = {
		id: number;
		texto: string | undefined;
		likes: number;
		ediciones: Edicion[];
	};

	const startEditing = () => {
		editing = true;
	};

	const saveEdit = async () => {
		const { id, texto } = idea;
		try {
			await fetch(`/api/ideas/${id}/editar`, { method: 'POST', body: JSON.stringify({ texto }) });
			editing = false;
		} catch (e) {
			// console.error(e?.message ?? 'Hubo un error');
			// TODO: Mostrar toast o algo
		}
	};

	const like = async () => {
		try {
			const response = await fetch(`/api/ideas/like?id=${idea.id}`, { method: 'GET' });
			const data = await response.json();
			liked = !liked;
			console.log(data);
			idea.likes = data.count;
		} catch (e) {
			// console.error(e?.message ?? 'Hubo un error');
		}
	};
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		{#if editing}
				<textarea
					class="textarea textarea-bordered w-full h-32 mb-4"
					bind:value={idea.texto}
				></textarea>
			<div class="card-actions justify-end">
				<button
					class="btn btn-outline btn-sm"
					onclick={() => {editing = false;}}
				>
					Cancelar
				</button>
				<button
					class="btn btn-primary text-white btn-sm"
					onclick={() => saveEdit()}
				>
					Guardar
				</button>
			</div>
		{:else if showingHistory}
			<div class="mb-4">
				<h3 class="font-semibold mb-2">Historial de Ediciones</h3>
				{#if !idea.historial && idea.historial.length === 0}
					<p class="text-base-content/70 text-sm">No hay ediciones previas</p>
				{:else}
					<div class="space-y-3">
						{#each idea.historial as log}
							<div class="bg-base-200 p-3 rounded-lg text-sm">
								<div class="flex justify-between text-base-content/70 mb-1">
									<!--									<span>{log.usuario}</span>-->
									<!--									<span>{log.fecha}</span>-->
								</div>
								<div class="space-y-1">
									<!--									<p class="line-through text-base-content/70">{log.textoAnterior}</p>-->
									<!--									<p class="text-success">{log.textoNuevo}</p>-->
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="card-actions justify-end">
				<!--					on:click={() => toggleHistory(idea)}-->
				<button
					class="btn btn-outline btn-sm"
				>
					Cerrar Historial
				</button>
			</div>
		{:else}
			<p class="text-lg text-center mb-4">{idea.texto}</p>
			<div class="flex justify-between items-center text-sm text-base-content/70">
				<!--				<span>{idea.autor}</span>-->
				<!--				<span>{idea.fecha}</span>-->
			</div>
			<!-- ACTIONS -->
			<div class="card-actions xl:justify-between justify-center items-center mt-4">
				<div class="flex gap-2">
					<button class="btn btn-outline btn-sm gap-2" onclick={like}>
						<Icon icon={liked?"solar:heart-bold":"solar:heart-linear"} font-size="20px" />
						{idea.likes ?? "0"}
					</button>
					<div class="flex items-center gap-1">
						<button
							class="btn btn-outline btn-sm tooltip"
							data-tip="Editar idea"
							onclick={() => startEditing()}
						>
							<Icon icon="solar:pen-2-linear" inline={false} font-size="18px" />
						</button>
						<!--						{#if idea.historial.length > 0}-->
						<!--&lt;!&ndash;								on:click={() => toggleHistory(idea)}&ndash;&gt;-->
						<!--							<button-->
						<!--								class="btn btn-outline btn-sm tooltip"-->
						<!--								data-tip="Ver historial de ediciones"-->
						<!--							>-->
						<!--                      <span class="text-xs bg-base-300 px-2 py-0.5 rounded-full">-->
						<!--                        {idea.historial.length}-->
						<!--                      </span>-->
						<!--							</button>-->
						<!--						{/if}-->
					</div>
				</div>
				<button class="btn btn-primary text-white btn-sm flex max-lg:tooltip "
								data-tip="Crear propuesta">
					<span class="sm:hidden lg:block">Crear propuesta</span>
					<Icon icon="solar:square-arrow-right-up-linear" inline={false} font-size="20px" />
				</button>
			</div>
		{/if}
	</div>
</div>