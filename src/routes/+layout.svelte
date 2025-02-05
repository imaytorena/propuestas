<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import type { PageProps } from './$types';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import MobileDrawer from '$lib/components/Layout/MobileDrawer.svelte';
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';

	const { children, data }: PageProps = $props();
</script>

<ParaglideJS {i18n}>
	<div class="qci-layout-bg max-w-6xl mx-auto flex min-h-screen flex-col">
		<div class="drawer">
			<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col">
				<div class="w-full">
					<Navbar />
				</div>
				<main class="container mx-auto w-full flex-grow px-4 py-8 font-mono">
					{@render children()}
				</main>
				<Footer />
				<MobileDrawer />
			</div>
		</div>
	</div>
</ParaglideJS>
