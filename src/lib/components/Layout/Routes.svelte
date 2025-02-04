<script lang="ts">
	const { route } = $props();
</script>

<li><a href="/" class="btn-link no-underline text-black hover:text-primary" class:active={route.id === '/'}>Inicio</a></li>
<li><a href="/participacion" class="btn-link no-underline text-black hover:text-primary" class:active={route.id?.startsWith('/participacion')||route.id?.startsWith('/propuestas')||route.id?.startsWith('/actividades')}>Participación</a></li>
<li><a href="/comunidades" class="btn-link no-underline text-black hover:text-primary" class:active={route.id?.startsWith('/comunidades')}>Comunidades</a></li>


<style>
    .active {
        text-decoration: underline;
				@apply btn-link text-primary cursor-pointer;
    }
</style>