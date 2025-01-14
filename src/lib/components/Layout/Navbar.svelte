<script lang="ts">
	import Routes from '$lib/components/Layout/Routes.svelte';
	import { page } from '$app/state';
</script>
<nav class="navbar text-black p-4 w-full lg:justify-around lg:items-center">
	<div class="flex-none lg:hidden">
		<!--	Hamburger icon for mobile experience	-->
		<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-6 w-6 stroke-current">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</label>
	</div>
	<div class="mx-2 px-4 font-['Poiret_One'] font-bold text-[1.7rem] bg-neutral text-white rounded-xl">
			SCU
	</div>
	<div class="hidden flex-none lg:block">
		<ul class="flex gap-6 font-['Shadows_Into_Light'] text-[1.7rem]">
			<Routes route={page.route} />
		</ul>
	</div>
</nav>
