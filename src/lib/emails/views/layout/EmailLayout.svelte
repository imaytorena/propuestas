<script lang="ts">
	import EmailHeader from './EmailHeader.svelte';
	import EmailFooter from './EmailFooter.svelte';
	import { Heading, Html, Preview, Section } from 'svelte-email';

	const { head, title, preview, children } = $props();
</script>

<Html>
	<EmailHeader {head} description={preview} />
	<Preview preview={head + ' - ' + preview} />

	<Section style={{ padding: '20px 0' }}>
		<Heading
			style={{
                fontFamily: 'Delius',
				fontSize: '32px',
				lineHeight: '1.3',
				fontWeight: '700',
				color: '#484848'
			}}
		>
			{title}
		</Heading>
		{@render children()}
	</Section>
	<Section style={{ padding: '20px 0' }}>
		<EmailFooter />
	</Section>
</Html>
