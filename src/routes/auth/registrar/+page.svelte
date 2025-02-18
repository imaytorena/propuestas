<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	const { data, form } = $props();
	let loading : { bar: boolean, inputs: boolean } = getContext('loading');

	$effect(() => {
		if (data?.session) {
			goto('/');
		}
		loading.inputs = false;
	});

	$effect(() => {
		if (form?.success) {
			goto('/auth/login');
		}
		if(form?.incorrect || form?.missing){
			loading.inputs = false;
		}
	});

	onMount(() => {
		loading.bar = false;
	});
</script>

<div class="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center space-y-8">
	<div>
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear una cuenta</h2>
		<p class="mt-2 text-center text-sm text-gray-600">
			¿Ya tienes una cuenta?
			<a href="/auth/login" class="font-medium text-primary hover:text-primary/90">
				Inicia sesión
			</a>
		</p>
	</div>
	<form method="POST" use:enhance class="mt-8 flex flex-col gap-6">
		<div>
			<label for="username" class="sr-only">Usuario</label>
			<input
				id="username"
				name="username"
				type="text"
				required
				class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
				placeholder="Usuario"
			/>
		</div>
		<div>
			<label for="nombre" class="sr-only">Nombre</label>
			<input
				id="nombre"
				name="nombre"
				type="text"
				required
				class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
				placeholder="Nombre"
			/>
		</div>
		<div class="flex gap-4">
			<div class="flex-1">
				<label for="primerApellido" class="sr-only">Primer Apellido</label>
				<input
					id="primerApellido"
					name="primerApellido"
					type="text"
					required
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
					placeholder="Primer Apellido"
				/>
			</div>
			<div class="flex-1">
				<label for="segundoApellido" class="sr-only">Segundo Apellido</label>
				<input
					id="segundoApellido"
					name="segundoApellido"
					type="text"
					required
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
					placeholder="Segundo Apellido"
				/>
			</div>
		</div>
		<div>
			<label for="email" class="sr-only">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				required
				class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
				placeholder="Email"
			/>
		</div>
		<div>
			<label for="password" class="sr-only">Contraseña</label>
			<input
				id="password"
				name="password"
				type="password"
				required
				class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
				placeholder="Contraseña"
			/>
		</div>

		<button
			type="submit"
			disabled={loading.inputs}
			class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
		>
			{#if loading.inputs}
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						class="h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				</span>
				Cargando...
			{:else}
				Registrarse
			{/if}
		</button>
	</form>
</div>
