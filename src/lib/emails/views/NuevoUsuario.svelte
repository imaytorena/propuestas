<script lang="ts"> 
	import { appUrl } from '../resources/utils';
	import EmailLayout from './layout/EmailLayout.svelte';
	import { Link, Text } from 'svelte-email';

	export let usuario: { nombre: string } = { nombre: '' };

	export let head: string = 'Nueva cuenta en ColectividApp';
	export let preview: string = 'Hola, bienvenidx a ColectividApp';
	export let title: string = 'Bienvenidx a ColectividApp, ' + usuario.nombre;
	export let confirmarCorreoUrl: string = appUrl + '/auth/confirmar-correo/<uuid-confirmacion>';
</script>

<EmailLayout head={head} title={title} preview={preview}>
	<Text>Para terminar el registro, por favor, confirma tu correo.</Text>
	<Link href={confirmarCorreoUrl} style={{ textDecoration: 'underline' }}>Confirmar correo</Link>
</EmailLayout>
