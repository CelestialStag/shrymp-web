import { ReactNode, SyntheticEvent, useState } from 'react';

import { sendLandingForm } from '../lib/LinkTool';
import { Domain, Link } from '../lib/types';

import { LinkAction } from '../lib/store/store.enum';
import { useStore } from 'lib/store/StoreProvider';

import style from './LinkTool.module.scss';

interface Props {
	domainList: Domain[];
}

const LinkTool = (props: Props) => {
	const [ error, useError ] = useState<null | string>(null);

	const dispatch = useStore(state => state.dispatch);
	const shrympLink = useStore(state => state.created_link);

	const CreateTinyURL = (data: Link) => {
		dispatch({
			type: LinkAction.CREATE_LINK,
			created_link: data
		});
	};

	const LinkToolAction = async (form: SyntheticEvent<HTMLFormElement>) => {
		form.preventDefault();
		form.stopPropagation();

		await sendLandingForm(form).then((responce) => {
			try {
				const linkData = JSON.parse(responce);
				if(linkData.errors) {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useError(linkData.errors[0]);
				} else {
					CreateTinyURL(linkData);
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useError(null);
				}
			} catch (err) {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useError(responce);
			}
		});
	};

	const copyFunc = (event: SyntheticEvent<HTMLInputElement>) => {
		if(shrympLink) {
			(event.target as HTMLInputElement).select();
			if (typeof (navigator.clipboard) == 'undefined') {
				document.execCommand('copy');
			} else {
				navigator.clipboard.writeText(shrympLink);
			}
		}
	};
	
	return (
		<form onSubmit={LinkToolAction}>
			<input id='long-url' name='long-url' type='text'
				placeholder='enter a url to shorten' required />
			<div className={style.domainSection}>
				<select id='domain-id' name='domain-id'
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
					placeholder='create a custom link' />
			</div>
			<input id='shrymp-link' name='shrymp-link' type='text'
				onClick={copyFunc} value={shrympLink}
				placeholder='your url will appear here' readOnly/>


			<input type='submit' value='create' style={{ width: '100%' }} />

			<div className={style.errorMessage}>
				<small>
					{error}
				</small>
			</div>
		</form>
	);
};

export {
	LinkTool
};