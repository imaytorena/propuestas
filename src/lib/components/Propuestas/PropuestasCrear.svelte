<script lang="ts">
	import { enhance } from '$app/forms';
	
	let { usuario } = $props();
	let loading = $state(false);

	$effect(() => {
		loading = false;
	});

	const onclick = async () => {
		loading = true;
	};
</script>

<form
	method="POST"
	action="/api/propuestas"
	use:enhance={() => {
		return ({ form }) => {
			form.reset();
		};
	}}
	class="card w-full bg-base-100 shadow-xl mb-4"
>
	<div class="card-body flex flex-col gap-4">
		<h2 class="card-title">Nueva Propuesta</h2>
		<div class="form-control">
			<label class="label font-bold" for="nombre">
				<span class="label-text">Titulo</span>
			</label>
			<input type="text" name="nombre" id="nombre" class="input input-bordered" required />
		</div>
		<div class="form-control">
			<label class="label font-bold" for="descripcion">
				<span class="label-text">Descripción</span>
			</label>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<textarea name="descripcion" id="descripcion" class="textarea textarea-bordered" rows="4" required />
		</div>
		<!-- fecha de entrega -->
		<div class="form-control">
			<label class="label font-bold" for="fecha_entrega">
				<span class="label-text">Fecha de Entrega</span>
			</label>
			<input type="date" name="fecha_entrega" id="fecha_entrega" class="input input-bordered" />
		</div>
		<!-- <div class="form-control">
			<label class="label font-bold" for="imagen">
				<span class="label-text">Imagen</span>
			</label>
			<input type="file" name="imagen" id="imagen" class="file-input file-input-bordered w-full" />
		</div> -->

		<div class="flex justify-between items-center mt-4">
			<div>
				<b>Usuario:</b> {usuario.username}
			</div>
			<div>
				<button type="submit" class="btn btn-gray text-gray-700">Cancelar</button>
				<button type="submit" class="btn btn-primary text-white" {onclick}>Crear propuesta</button>
			</div>
		</div>
	</div>
</form>
