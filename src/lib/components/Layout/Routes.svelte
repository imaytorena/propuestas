<script lang="ts">
	const { route } = $props();
</script>

<li><a href="/" class="btn-link no-underline text-black hover:text-primary" class:active={route.id === '/'}>INICIO</a></li>
<li><a href="/propuestas" class="btn-link no-underline text-black hover:text-primary" class:active={route.id?.startsWith('/propuestas')}>PROPUESTAS</a></li>
<li><a href="/comunidades" class="btn-link no-underline text-black hover:text-primary" class:active={route.id?.startsWith('/comunidades')}>COMUNIDADES</a></li>


<style>
    .active {
        text-decoration: underline;
				@apply btn-link text-primary cursor-pointer;
    }
</style>