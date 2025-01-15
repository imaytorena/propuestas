<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import '../app.css';
	import MobileDrawer from '$lib/components/Layout/MobileDrawer.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="qci-layout-bg min-h-screen flex flex-col bg-base-200">
		<div class="drawer">
			<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col">
				<Navbar />
				<main class="flex-grow container mx-auto px-4 py-8 font-mono">
					{@render children()}
				</main>
				<Footer />
			</div>
			<MobileDrawer />
		</div>
	</div>
</ParaglideJS>
