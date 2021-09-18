import { FiExternalLink } from 'react-icons/fi';

import { Link } from '../lib/types';
import { LinkAction } from '../lib/store/store.enum';
import { useStore } from '../lib/store/StoreProvider';


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
		<div>
			<div
				style={{
					overflow: 'hidden',
					textOverflow: 'ellipsis', 
					whiteSpace: 'nowrap',
					width: '100%'
				}}>
				<h6>
					{generatedURL}
				</h6>
				<div>
					{props.link.long_url}
				</div>
			</div>
			<div>
				<a href={generatedURL}>
					<button value='visit'>
						<FiExternalLink />
					</button>
				</a>
				&nbsp;
				<input type="button" value='copy' className='button-outline'
					onClick={copyLink} />
				&nbsp;
				<input type="button" value='delete' className='button-outline'
					onClick={deleteLink} />
			</div>
		</div>
	);
};

export {
	LinkListItem
};