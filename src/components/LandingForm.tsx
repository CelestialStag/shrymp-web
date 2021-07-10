import { SyntheticEvent, useState } from 'react';

import { CreatedURL } from '../lib/types';
import { sendLandingForm } from '../lib/LandingForm';

import config from '../../config/server.json';

const LandingForm = () => {
	const [ tinyURL, useTinyURL ] = useState('');
	
	const DisplayTinyURL = (data: CreatedURL) => {
		useTinyURL(`${config.server}/${data.tiny_url}`);
	};

	const landingFormAction = (form: SyntheticEvent<HTMLFormElement>) => {
		form.preventDefault();
		form.stopPropagation();

		sendLandingForm(form).then((responce) => {
			DisplayTinyURL(responce);
		});
	};

	const copyFunc = (event: SyntheticEvent<HTMLInputElement>) => {
		(event.target as HTMLInputElement).select();
		document.execCommand('copy');
	};
	
	return (
		<div className='flex full-height center'>
			<form onSubmit={landingFormAction} className='direction-vertical' >
				<input id='long-url' name='long-url' type='text'
					placeholder='enter a url to shorten' required />
				<input id='tiny-url' name='tiny-url' type='text' onClick={copyFunc}
					placeholder='your url will appear here' value={tinyURL} readOnly/>
				<input type='submit' value='create' style={{ width: '100%' }} />
			</form>
		</div>
	);
};

export {
	LandingForm
};