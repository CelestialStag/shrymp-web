import { FiExternalLink } from 'react-icons/fi';

import { Link } from '../lib/types';
import { LinkAction } from '../lib/store/store.enum';
import { useStore } from '../lib/store/StoreProvider';

import style from './LinkListItem.module.scss';

interface Props {
	children?: React.ReactNode;
	link: Link;
}

const LinkListItem = (props: Props) => {
	const dispatch = useStore(state => state.dispatch);
	
	const generatedURL = `http://${props.link.domain}/${props.link.tiny_url}`;

	const copyLink = () => {
		if (typeof (navigator.clipboard) == 'undefined') {
			// do nothing
		} else {
			navigator.clipboard.writeText(generatedURL);
		}
	};

	const deleteLink = () => {
		dispatch({
			type: LinkAction.DELETE_LINK,
			deleted_link: props.link.tiny_url
		});
	};

	return (
		<div className={style.linkList}>
			<div
				className={style.linkListText}
				style={{
					overflow: 'hidden',
					textOverflow: 'ellipsis', 
					whiteSpace: 'nowrap',
					width: '100%'
				}}>
				<div>
					<strong>
						{generatedURL}
					</strong>
				</div>
				<div>
					<em>
						{props.link.long_url}
					</em>
				</div>
			</div>
			<div className={style.buttonList}>
				<a href={generatedURL}>
					<button value='visit'>
						<FiExternalLink />
					</button>
				</a>
				<input type="button" value='copy' className='button-outline'
					onClick={copyLink} />
				<input type="button" value='delete' className='button-outline'
					onClick={deleteLink} />
			</div>
		</div>
	);
};

export {
	LinkListItem
};