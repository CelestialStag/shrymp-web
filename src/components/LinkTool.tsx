import { ReactNode, SyntheticEvent } from 'react';

import { sendLandingForm } from '../lib/LinkTool';
import { Domain, Link } from '../lib/types';

import { LinkAction } from '../lib/store/store.enum';
import { useStore } from 'lib/store/StoreProvider';

interface Props {
	domainList: Domain[];
}

const LinkTool = (props: Props) => {
	const dispatch = useStore(state => state.dispatch);
	const tinyURL = useStore(state => state.created_link);

	const CreateTinyURL = (data: Link) => {
		dispatch({
			type: LinkAction.CREATE_LINK,
			created_link: data
		});
	};

	const linkToolAction = async (form: SyntheticEvent<HTMLFormElement>) => {
		form.preventDefault();
		form.stopPropagation();

		await sendLandingForm(form).then((responce) => {
			CreateTinyURL(responce);
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
			<select id='domain' name='domain'
				placeholder='enter a url to shorten'>
				{(() => {
					const options: ReactNode[] = [];
					for (const domain in props.domainList) {             
						options.push(
							<option key={domain}
								value={props.domainList[domain].id}>
								{props.domainList[domain].domain}
							</option>
						);   
					}
					return options;
				})()}
			</select>
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