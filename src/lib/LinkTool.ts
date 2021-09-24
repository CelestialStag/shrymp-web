import { SyntheticEvent } from 'react';

import fetch from 'node-fetch';
import qs from 'querystring';

import config from '../../config/server.json';

const baseURL = `${config.server}/api/v1`;
const baseLocalURL = `${config.local_server}/api/v1`;

export const loadDomains = async () => {
	const data = await fetch(`${baseLocalURL}/domain`, {
		method: 'GET'
	});

	return data.json();
};

export const sendLandingForm = async (form: SyntheticEvent<HTMLFormElement>) => {
	const longURL = (form.currentTarget[0] as HTMLInputElement).value;
	const domainID = (form.currentTarget[1] as HTMLInputElement).value;
	const tinyURL = (form.currentTarget[2] as HTMLInputElement).value;
	
	const request = {
		long_url: longURL,
		tiny_url: tinyURL ?? null,
		domain_id: domainID
	};

	const data = await fetch(`${baseURL}/link`, {
		method: 'POST',
		body: qs.stringify(request),
		headers: {
			'access-control-allow-credentials': 'true',
			'content-type': 'application/x-www-form-urlencoded'
		}
	});
	
	return data.text();
};