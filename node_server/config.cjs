module.exports = {
	apps: [
		{
			name: 'colectividapp',
			script: 'index.js',
			watch: false,
			instances: 'max',
			exec_mode: 'cluster'
		}
	]
};
