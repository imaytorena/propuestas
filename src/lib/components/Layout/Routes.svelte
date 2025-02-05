<script lang="ts">
	const { route } = $props();
	import { page } from '$app/stores';

	const showLoginButton = $derived(!$page.data.session && !$page.url.pathname.startsWith('/auth'));
	// '/auth/logout'
</script>

<li>
	<a
		href="/"
		class="btn-link text-black no-underline hover:text-primary"
		class:active={route.id === '/'}>Inicio</a
	>
</li>
<li>
	<a
		href="/participacion"
		class="btn-link text-black no-underline hover:text-primary"
		class:active={route.id?.startsWith('/participacion') ||
			route.id?.startsWith('/propuestas') ||
			route.id?.startsWith('/actividades')}>Participación</a
	>
</li>
<li>
	<a
		href="/comunidades"
		class="btn-link text-black no-underline hover:text-primary"
		class:active={route.id?.startsWith('/comunidades')}>Comunidades</a
	>
</li>
{#if showLoginButton}
	<li class="flex flex-col justify-center">
		<a href="/auth/login" class="btn-link text-black no-underline hover:text-primary flex items-center">
			{#if true}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6"/></svg>
			{/if}
			<svg xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					fill-rule="evenodd"
					d="M9 6.25a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5M7.75 9a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0M9 12.25c-1.196 0-2.315.24-3.164.665c-.803.402-1.586 1.096-1.586 2.085v.063c-.002.51-.004 1.37.81 1.959c.378.273.877.448 1.495.559c.623.112 1.422.169 2.445.169s1.822-.057 2.445-.169c.618-.111 1.117-.286 1.495-.56c.814-.589.812-1.448.81-1.959V15c0-.99-.783-1.683-1.586-2.085c-.849-.424-1.968-.665-3.164-.665M5.75 15c0-.115.113-.421.757-.743c.6-.3 1.48-.507 2.493-.507s1.894.207 2.493.507c.644.322.757.628.757.743c0 .604-.039.697-.19.807c-.122.088-.373.206-.88.298c-.502.09-1.203.145-2.18.145s-1.678-.055-2.18-.145c-.507-.092-.758-.21-.88-.298c-.152-.11-.19-.203-.19-.807"
					clip-rule="evenodd"
				/><path
					fill="currentColor"
					d="M19 12.75a.75.75 0 0 0 0-1.5h-4a.75.75 0 0 0 0 1.5zM19.75 9a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 .75.75M19 15.75a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0 0 1.5z"
				/><path
					fill="currentColor"
					fill-rule="evenodd"
					d="M9.944 3.25h4.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153M5.71 4.89c-1.006.135-1.586.389-2.01.812c-.422.423-.676 1.003-.811 2.009c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812s.677-1.003.812-2.009c.138-1.028.14-2.382.14-4.289s-.002-3.261-.14-4.29c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14"
					clip-rule="evenodd"
				/></svg
			>
		</a>
	</li>
{:else}
	<li class="flex flex-col justify-center">
		<a href="/auth/login" class="btn-link text-primary no-underline hover:text-primary flex items-center">
			{#if true}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6"/></svg>
			{/if}
			<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					fill-rule="evenodd"
					d="M10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12s0-5.657 1.172-6.828S6.229 4 10 4m3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M11 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2"
					clip-rule="evenodd"
				/></svg
			>
		</a>
	</li>
{/if}

<style>
	.active {
		text-decoration: underline;
		@apply btn-link cursor-pointer text-primary;
	}
</style>
