'use strict';

import { SocketIO } from '../structures/index.js';
import { pluginId } from '../utils/pluginId.js';

/**
 * Bootstrap IO instance and related "services"
 *
 * @param {*} params
 * @param {*} params.strapi
 */
async function bootstrapIO({ strapi }) {
	const settings = strapi.config.get(`plugin.${pluginId}`);

	// initialize io
	const io = new SocketIO(settings.socket.serverOptions);

	// make io available anywhere in the Strapi global object
	strapi.$io = io;

	// add any io server events
	if (settings.events?.length) {
		strapi.$io.server.on('connection', (socket) => {
			for (const event of settings.events) {
				// "connection" event should be executed immediately
				if (event.name === 'connection') {
					event.handler({ strapi, io }, socket);
				} else {
					// register all other events to be triggered at a later time
					socket.on(event.name, (...args) => event.handler({ strapi, io }, socket, ...args));
				}
			}
		});
	}
}

export default bootstrapIO;
