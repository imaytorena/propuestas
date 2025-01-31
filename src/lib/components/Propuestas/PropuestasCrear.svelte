<script lang="ts">
	import { enhance } from '$app/forms';
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
	<div class="card-body flex flex-col gap-3">
		<h2 class="card-title">Nueva Propuesta</h2>
		<div class="form-control">
			<label class="label" for="nombre">
				<span class="label-text">Nombre</span>
			</label>
			<input type="text" name="nombre" id="nombre" class="input input-bordered" required />
		</div>
		<!-- fecha de entrega -->
		<div class="form-control">
			<label class="label" for="fecha_entrega">
				<span class="label-text">Fecha de Entrega</span>
			</label>
			<input type="date" name="fecha_entrega" id="fecha_entrega" class="input input-bordered" />
		</div>
		<div class="form-control">
			<label class="label" for="descripcion">
				<span class="label-text">Descripción</span>
			</label>
			<textarea name="descripcion" id="descripcion" class="textarea textarea-bordered" required />
		</div>
		<!-- <div class="form-control">
			<label class="label" for="imagen">
				<span class="label-text">Imagen</span>
			</label>
			<input type="file" name="imagen" id="imagen" class="file-input file-input-bordered w-full" />
		</div> -->
		<div class="card-actions justify-center">
			<button type="submit" class="btn btn-primary btn-lg">Participar</button>
		</div>
	</div>
</form>
