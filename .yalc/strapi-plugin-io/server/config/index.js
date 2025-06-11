'use strict';

import { plugin } from './schema.js';

function getDefaultConfig() {
	return {
		events: [],
		hooks: {},
		socket: { serverOptions: { cors: { origin: 'http://127.0.0.1:8080', methods: ['GET', 'POST'] } } },
	};
}

function validator(config) {
	plugin.parse(config);
}

export default { getDefaultConfig, validator };
