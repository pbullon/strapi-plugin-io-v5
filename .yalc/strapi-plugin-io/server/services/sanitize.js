'use strict';

import { sanitize } from '@strapi/utils';

export default ({ strapi }) => {
	/**
	 * Sanitize data output with a provided schema for a specified role
	 *
	 * @param {Object} param
	 * @param {Object} param.schema
	 * @param {Object} param.data
	 * @param {Object} param.options
	 */
	async function output({ schema, data, options }) {
		return sanitize.contentAPI.sanitizeOutput(data, schema, options);
	}

	return {
		output,
	};
};
