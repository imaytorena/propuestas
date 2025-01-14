<script lang="ts">
	import type { Propuesta } from '$lib/server/db/schema';
	import { enhance } from '$app/forms';

	export let propuesta: Propuesta;
	let editing = false;
</script>

<div class="card w-full bg-base-100 shadow-xl mb-4">
	<div class="card-body">
		<h2 class="card-title">{propuesta.nombre}</h2>
		<p class="whitespace-pre-wrap">{propuesta.descripcion}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary" on:click={() => (editing = !editing)}>
				{editing ? 'Cancelar' : 'Editar'}
			</button>
		</div>
		
		{#if editing}
			<form
				method="POST"
				action="/api/propuestas/editar?id={propuesta.id}"
				use:enhance={() => {
					return ({ result }) => {
						if (result.type === 'success') {
							editing = false;
						}
					};
				}}
			>
				<div class="form-control">
					<label class="label" for="nombre">
						<span class="label-text">Nombre</span>
					</label>
					<input
						type="text"
						name="nombre"
						id="nombre"
						class="input input-bordered"
						value={propuesta.nombre}
						required
					/>
				</div>
				<div class="form-control">
					<label class="label" for="descripcion">
						<span class="label-text">Descripción</span>
					</label>
					<textarea
						name="descripcion"
						id="descripcion"
						class="textarea textarea-bordered"
						value={propuesta.descripcion}
						required
					/>
				</div>
				<div class="form-control mt-4">
					<button type="submit" class="btn btn-primary">Guardar</button>
				</div>
			</form>
		{/if}
	</div>
</div>
