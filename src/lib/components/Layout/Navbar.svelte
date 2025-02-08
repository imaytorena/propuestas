<script lang="ts">
	import Routes from '$lib/components/Layout/Routes.svelte';
	import { page } from '$app/state';
	import logo from '$lib/images/logo.png';
	let {route} = $derived(page);
</script>
<nav class="navbar container text-black p-4 pb-0 md:pb-4 w-full flex flex-col lg:flex-row justify-center lg:flex-grow m-auto items-center lg:justify-between">
	<div class="flex items-center gap-2">
		<img src={logo} alt="Logo" class="md:w-20 w-12" />
		<span class="font-['Delius'] text-[1.7rem]">ColectividApp</span>
	</div>
	<div class="flex-none max-w-[70vw] md:max-w-full overflow-hidden overflow-x-scroll snap-x snap-mandatory md:overflow-x-hidden">
		<ul class="flex gap-6 text-lg md:text-3xl">
			<Routes {route} />
		</ul>
	</div>
</nav>
