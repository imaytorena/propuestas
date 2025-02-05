<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

	const { data } = $props();
	let { usuario = {} }: PageData = $state(data);

    const cerrarSesion = async() => {
        // TODO: agregar la lógica para cerrar sesión
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        });
        if (res.ok) {
            goto('/');
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
    <p class="mt-2 text-gray-600">Información personal del usuario</p>
    <div class="mt-8">
        <p>Usuario: {usuario.username}</p>
        <p>Correo: {usuario.correo}</p>
    </div>
    <button onclick={cerrarSesion} class="btn btn-link text-primary px-0 text-md">Cerrar Sesión</button>
</div>