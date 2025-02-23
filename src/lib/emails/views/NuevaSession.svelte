	<script lang="ts">
	import { appUrl } from '../resources/utils';
	import EmailLayout from './layout/EmailLayout.svelte';
	import { Link, Text } from 'svelte-email';

	export let usuario: { nombre: string } = { nombre: '' };
	export let head: string = usuario.nombre+'!';
	export let preview: string = 'Nueva sesión en ColectividApp';
	export let title: string = 'Se ha iniciado sesión en ColectividApp con este correo';
	export let cambiarContrasenaUrl: string = appUrl + '/auth/cambiar-contrasena';
</script>

<EmailLayout head={head} title={title} preview={preview}> 
	<Text>Si no has sido tú, ve al siguiente enlace</Text>
	<Link href={cambiarContrasenaUrl} style={{ textDecoration: 'underline' }}>Cambiar contraseña</Link>
</EmailLayout>
