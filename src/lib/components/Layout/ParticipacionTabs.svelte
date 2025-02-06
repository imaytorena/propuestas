<script lang="ts">
	import Tab from "../Tab.svelte";
	import { page } from '$app/state';
	const { children } = $props();

    let { route } = $derived(page);
	let checked = $state("");
    let tipoVista = $state("");
    let userIsLogged = $derived(page.data.session != null);
    
    $effect(() => {
        checked = route.id?.split("/")[1] ?? "";
    })
    
    $effect(() => {
        tipoVista = route.id?.startsWith("/participacion") ? "participacion" : route.id?.startsWith("/propuestas") ? "propuestas" : route.id?.startsWith("/actividades") ? "actividades" : "ideas"
    })
</script>

<div class="mb-6 flex items-center justify-between">
    <div class="flex flex-col items-start">
        <h2 class="mb-2 text-3xl font-bold">
            {#if tipoVista == "participacion"}
                Participación
            {:else if tipoVista == "propuestas"}
                Propuestas
            {:else if tipoVista == "actividades"}
                Actividades
            {:else}
                Ideas
            {/if}
        </h2>
        <p class="text-sm max-w-2xl h-8">
            {#if tipoVista == "participacion"}
                La participación es la forma en las personas se involucran en la realización de los proyectos, puede ser mediante Propuestas o Actividades.
            {:else if tipoVista == "propuestas"}
                Una propuesta es un proyecto que se propone realizar con el fin de encontrar soluciones sostenibles para la comunidad.
            {:else if tipoVista == "actividades"}
                Las actividades son eventos que se realizan de manera presencial o virtual con el objetivo de realizar cambios en favor del medio ambiente.
            {:else}
                Las ideas son solo eso, ideas. Son sugerencias que se pueden convertir en propuestas o actividades para encontrar soluciones a partir de ellas.
            {/if}
        </p>
    </div>
    {#if (tipoVista !== "participacion") && (tipoVista !== "ideas") && userIsLogged}
        <a
            href={page.route.id?.endsWith("/nueva") ? "" : page.route.id + "/nueva"}
            class="btn btn-primary rounded-md px-4 py-2 text-white transition-colors"
        >
            Crear una 
            {#if tipoVista == "propuestas"}
                Propuestas
            {:else}
                Actividades
            {/if}
        </a>
    {/if}
</div>

<div role="tablist" class="tabs tabs-lifted">
	<Tab label={checked == "/participacion" ? "____________" :  "Participación"} group="participacion_group" id="participacion" bind:value={checked} isLink>
		{@render children()}
	</Tab>
	<Tab label={checked == "/propuestas" ? "__________" :  "Propuestas"} group="participacion_group" id="propuestas" bind:value={checked} isLink>
		{@render children()}
	</Tab>
	<Tab label={checked == "/actividades" ? "___________" :  "Actividades"} group="participacion_group" id="actividades" bind:value={checked} isLink>
		{@render children()}
	</Tab>
	<Tab label={checked == "/ideas" ? "_____" :  "Ideas"} group="participacion_group" id="ideas" bind:value={checked} isLink>
		{@render children()}
	</Tab>
</div>