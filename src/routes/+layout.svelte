<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import MobileDrawer from '$lib/components/Layout/MobileDrawer.svelte';
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import ParticipacionTabs from '$lib/components/Layout/ParticipacionTabs.svelte';

	const { children, data }: PageProps = $props();
	let addParticipacionTabs = $derived(page.route?.id?.startsWith('/participacion') || page.route?.id?.startsWith('/propuestas') || page.route?.id?.startsWith('/actividades') || page.route?.id?.startsWith('/ideas'));
</script>

<ParaglideJS {i18n}>
	<div class="qci-layout-bg mx-auto flex min-h-screen max-w-6xl flex-col">
		<div class="drawer">
			<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col">
				<div class="w-full">
					<Navbar />
				</div>
				<main class="container mx-auto w-full flex-grow px-4 py-4 font-mono">
					{#if addParticipacionTabs}
						<ParticipacionTabs>
							{@render children()}
						</ParticipacionTabs>
					{:else}
						{@render children()}
					{/if}
				</main>
				<Footer />
				<MobileDrawer />
			</div>
		</div>
	</div>
</ParaglideJS>
