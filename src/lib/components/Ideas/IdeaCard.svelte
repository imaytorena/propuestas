<script lang="ts">
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

<div class="card bg-base-100 shadow-xl h-full">
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
						{#if liked}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="currentColor"
											d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137" />
							</svg>
						{:else }
							<svg xmlns="http://www.w3.org/2000/svg" font-size="20px" width="24" height="24" viewBox="0 0 24 24">
								<path fill="currentColor"
											d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043s-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z" />
							</svg>
						{/if}
						{idea.likes ?? "0"}
					</button>
					<div class="flex items-center gap-1">
						<button
							class="btn btn-outline btn-sm tooltip"
							data-tip="Modificar idea"
							onclick={() => startEditing()}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
								<g fill="none" stroke="currentColor" stroke-width="1.5">
									<path stroke-linecap="round" d="M4 22h16" />
									<path
										d="m13.888 3.663l.742-.742a3.146 3.146 0 1 1 4.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966s2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.2 5.2 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891q-.451.352-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 0 1-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5" />
								</g>
							</svg>
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
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176m3.223 6.246a.75.75 0 0 1 .75-.75h4.242a.75.75 0 0 1 .75.75v4.242a.75.75 0 0 1-1.5 0v-2.432L9.702 15.36a.75.75 0 1 1-1.06-1.06l4.376-4.377h-2.432a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/></svg>
				</button>
			</div>
		{/if}
	</div>
</div>