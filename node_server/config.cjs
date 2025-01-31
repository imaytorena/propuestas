module.exports = {
	apps: [
		{
			name: 'colectividapp-server',
			script: 'server.js',
			watch: false,
			instances: 'max',
			exec_mode: 'cluster'
		}
	]
};
