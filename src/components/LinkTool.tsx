import { SyntheticEvent } from 'react';

import { Link } from '../lib/types';
import { sendLandingForm } from '../lib/LandingForm';

import { LinkAction } from '../lib/store/store.enum';
import { useStore } from 'lib/store/StoreProvider';

const LinkTool = () => {
	const dispatch = useStore(state => state.dispatch);
	const tinyURL = useStore(state => state.created_link);

	const linkToolAction = (form: SyntheticEvent<HTMLFormElement>) => {
		form.preventDefault();
		form.stopPropagation();

		const DisplayTinyURL = (data: Link) => {
			dispatch({
				type: LinkAction.CREATE_LINK,
				created_link: `http://${data.domain}/${data.tiny_url}`
			});
		};

		sendLandingForm(form).then((responce) => {
			DisplayTinyURL(responce);
		});
	};

	const copyFunc = (event: SyntheticEvent<HTMLInputElement>) => {
		if(tinyURL) {
			(event.target as HTMLInputElement).select();
			navigator.clipboard.writeText(tinyURL);
		}
	};
	
	return (
		<form onSubmit={linkToolAction}>
			<input id='long-url' name='long-url' type='text'
				placeholder='enter a url to shorten' required />
			<input id='tiny-url' name='tiny-url' type='text'
				onClick={copyFunc} value={tinyURL}
				placeholder='your url will appear here' readOnly/>
			<input type='submit' value='create' style={{ width: '100%' }} />
		</form>
	);
};

export {
	LinkTool
};