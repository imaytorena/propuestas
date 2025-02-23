<script lang="ts">
    import { Text, Link, Hr } from 'svelte-email';

    let appUrl = process.env.APP_URL ?? '';
    let date = new Date().getFullYear();
</script>

<div>
    <Hr style={{
        borderColor: '#cccccc',
        margin: '20px 0'
    }} />
    <Text style={{
        fontFamily: 'Delius',
		color: '#9ca299',
		fontSize: '14px',
		marginBottom: '10px'
	}}>ColectividApp @ {date}</Text>
    <Link href={appUrl} style={{
        fontFamily: 'monospace',
		color: '#9ca299',
		fontSize: '14px',
		textDecoration: 'underline'
    }}>go to site</Link>
</div>