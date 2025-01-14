<script>
	import Routes from '$lib/components/Layout/Routes.svelte';
	import {page} from '$app/state'
</script>

<div class="container drawer-side z-20">
	<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
	<ul class="menu bg-neutral text-white min-h-full w-80 p-4">
		<Routes route={page.route}/>
	</ul>
</div>