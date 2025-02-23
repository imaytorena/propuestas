<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast'
	let loading: { bar: boolean; inputs: boolean } = getContext('loading');

	let { data, form }: PageProps = $props();
	
	$effect(() => {
		if (data?.session) {
			goto('/');
		}
		loading.inputs = false;
		loading.bar = false;
	});

	$effect(() => {
		console.log({ form, data });
		if (form?.success) {
			toast.push('Inicio de sesión exitoso. Bienvenido, ' + form.usuario);
			goto('/');
		} else if (form?.incorrect) {
			toast.push(form?.message ?? 'Usuario o contraseña incorrectos');
		} else if (form?.missing) {
			toast.push(form?.message ?? 'Por favor, complete todos los campos');
		}
		loading.inputs = false;
		loading.bar = false;
	});
</script>
  
  <div class="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center space-y-8">
	<div>
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
		<p class="mt-2 text-center text-sm text-gray-600">
			¿No tienes una cuenta?
			<a href="/auth/registrar" class="font-medium text-primary hover:text-primary/90">
				Regístrate aquí
			</a>
		</p>
	</div>
	<form
		method="POST"
		class="mt-8 flex flex-col gap-6"
		use:enhance
	>
		<!-- <div class="rounded-md shadow-sm -space-y-px"> -->
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
		<!-- </div> -->

		<div>
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
					Iniciar Sesión
				{/if}
			</button>
		</div>
	</form>
</div>
<!-- </div> -->
