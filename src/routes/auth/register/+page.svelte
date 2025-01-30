<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const { data, form } = $props();
	let loading = $state(true);

	$effect(() => {
		if (data?.session) {
			goto('/');
		}
		loading = false;
	});
	
	$effect(() => {
	if(form?.success){
		goto('/auth/login');
	}	
	})
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Crear una cuenta
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				¿Ya tienes una cuenta?
				<a href="/auth/login" class="font-medium text-primary hover:text-primary/90">
					Inicia sesión
				</a>
			</p>
		</div>
		<form
			method="POST"
			use:enhance
			class="flex flex-col gap-6 mt-8"
		>
				<div>
					<label for="username" class="sr-only">Usuario</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
						placeholder="Usuario"
					/>
				</div>
				<div>
					<label for="email" class="sr-only">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
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
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
						placeholder="Contraseña"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
				>
					{#if loading}
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<svg
								class="animate-spin h-5 w-5 text-white"
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
</div>