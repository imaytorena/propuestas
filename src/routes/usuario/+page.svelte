<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	const { data } = $props();
	let { usuario }: PageData = $state(data);
	let loading : { bar: boolean } = getContext('loading');

	$effect(() => {
		loading.bar = usuario === undefined;
	});

    const cerrarSesion = async() => {
        try {
            const res = await fetch('/api/auth/logout', {method: 'POST'});
            if (res.ok) {
                goto('/', {invalidateAll: true});
            }
        } catch (e) {
            // TODO: Mostrar toast o algo
            // console.error(e?.message ?? 'Hubo un error');
        }
    }
</script>

{#if usuario}
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
        <p class="mt-2 text-gray-600">Información personal del usuario</p>
        <div class="mt-8 flex flex-col gap-4">
            <p><b>Usuario:</b> {usuario.username}</p>
            <p><b>Nombre:</b> {usuario.nombre}</p>
            <p><b>Primer Apellido:</b> {usuario.primerApellido}</p>
            <p><b>Segundo Apellido:</b> {usuario.segundoApellido}</p>
            <!-- <p><b>Carrera:</b> {usuario.carrera.nombre}</p> -->
            <p><b>Correo:</b> {usuario.correo}</p>
            <p><b>Fecha de creación:</b> {new Date(usuario.createdAt).toLocaleDateString('es-MX')}</p>
            <!-- <p><b>Ultima actualización:</b> {usuario.updatedAt}</p> -->
        </div>
        <button onclick={cerrarSesion} class="btn btn-link text-primary mt-4 px-0 text-md">Cerrar Sesión</button>
    </div>
{/if}