import { SyntheticEvent } from 'react';

import fetch from 'node-fetch';
import qs from 'querystring';

import config from '../../config/server.json';

const baseURL = `${config.server}/api/v1`;

export const sendLandingForm = async (form: SyntheticEvent<HTMLFormElement>) => {
	const longURL = (form.currentTarget[0] as HTMLInputElement).value;
	
	const request = {
		long_url: longURL
	};

	const data = await fetch(`${baseURL}/link`, {
		method: 'POST',
		body: qs.stringify(request),
		headers: {
			'access-control-allow-credentials': 'true',
			'content-type': 'application/x-www-form-urlencoded'
		}
	});

	return data.json();
};