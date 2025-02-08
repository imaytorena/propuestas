<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import MobileDrawer from '$lib/components/Layout/MobileDrawer.svelte';
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import LoadingBar from '$lib/components/Layout/LoadingBar.svelte';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import ParticipacionTabs from '$lib/components/Layout/ParticipacionTabs.svelte';
	import { getContext, setContext } from 'svelte';

	const { children, data }: PageProps = $props();
	let addParticipacionTabs = $derived(page.route?.id?.startsWith('/participacion') || page.route?.id?.startsWith('/propuestas') || page.route?.id?.startsWith('/actividades') || page.route?.id?.startsWith('/ideas'));

	let loading = $state({ bar: true, map: false });
	setContext('loading', loading);
</script>

<ParaglideJS {i18n}>
	<div class="qci-layout-bg mx-auto flex min-h-screen max-w-6xl flex-col">
		<div class="flex flex-col w-full">
			{#if loading.bar}
				<LoadingBar />
			{/if}
			<Navbar />
			<main class="container mx-auto w-full flex-grow px-4 font-mono">
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
</ParaglideJS>
