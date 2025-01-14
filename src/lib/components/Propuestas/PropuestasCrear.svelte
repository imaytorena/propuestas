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
	<div class="card-body">
		<h2 class="card-title">Nueva Propuesta</h2>
		<div class="form-control">
			<label class="label" for="nombre">
				<span class="label-text">Nombre</span>
			</label>
			<input type="text" name="nombre" id="nombre" class="input input-bordered" required />
		</div>
		<div class="form-control">
			<label class="label" for="descripcion">
				<span class="label-text">Descripción</span>
			</label>
			<textarea name="descripcion" id="descripcion" class="textarea textarea-bordered" required />
		</div>
		<div class="card-actions justify-end">
			<button type="submit" class="btn btn-primary">Crear</button>
		</div>
	</div>
</form>
