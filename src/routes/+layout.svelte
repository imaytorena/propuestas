<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import type { PageProps } from './$types';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import MobileDrawer from '$lib/components/Layout/MobileDrawer.svelte';
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';

	const {children, data }:PageProps = $props();
	const showLoginButton = $derived(!$page.data.session && !$page.url.pathname.startsWith('/auth'));

const logout = () => {
	// Implement your logout logic here
	goto('/auth/logout');
}
</script>

<ParaglideJS {i18n}>
	<div class="qci-layout-bg min-h-screen flex flex-col bg-base-200">
		<div class="drawer">
			<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col">
				<div class="w-full">
					<Navbar />
				</div>
				<main class="flex-grow container mx-auto px-4 py-8 font-mono w-full">
					{@render children()}
				</main>
				<Footer />
				<MobileDrawer />
			</div>
			{#if showLoginButton}
				<button 
					onclick={() => goto('/auth/login')}
					class="fixed bottom-10 right-20 items-center px-4 btn btn-primary text-white btn-md">
					Iniciar Sesión
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M2.001 11.999h14m0 0l-3.5-3m3.5 3l-3.5 3"/><path d="M9.002 7c.012-2.175.109-3.353.877-4.121C10.758 2 12.172 2 15 2h1c2.829 0 4.243 0 5.122.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.878 5.121C20.242 22 18.829 22 16 22h-1c-2.828 0-4.242 0-5.121-.879c-.768-.768-.865-1.946-.877-4.121"/></g></svg>
				</button>
			{:else}
			<button 
				onclick={logout}
				class="fixed bottom-10 right-20 items-center px-4 btn btn-ghost text-primary btn-md">
				Cerrar Sesión
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M2.001 11.999h14m0 0l-3.5-3m3.5 3l-3.5 3"/><path d="M9.002 7c.012-2.175.109-3.353.877-4.121C10.758 2 12.172 2 15 2h1c2.829 0 4.243 0 5.122.879C22 3.757 22 5.172 22 8v8c0 2.828 0 4.243-.878 5.121C20.242 22 18.829 22 16 22h-1c-2.828 0-4.242 0-5.121-.879c-.768-.768-.865-1.946-.877-4.121"/></g></svg>
			</button>
			{/if}
		</div>
	</div>
</ParaglideJS>
