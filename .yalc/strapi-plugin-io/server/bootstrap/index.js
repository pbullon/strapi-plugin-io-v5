'use strict';

import { bootstrapIO } from './io';
import { bootstrapLifecycles } from './lifecycle';

/**
 * Runs on bootstrap phase
 *
 * @param {*} params
 * @param {*} params.strapi
 */
export default async function bootstrap({ strapi }) {
	bootstrapIO({ strapi });
	bootstrapLifecycles({ strapi });
}
