import { Link } from '../lib/types';
import { LinkListItem } from './LinkListItem';

interface Props {
	children?: React.ReactNode;
	linkList: Link[];
}

const LinkList = (props: Props) => {

	const createLinklist = () => {
		return props.linkList.map((link: Link) => {
			return (
				<>
					<LinkListItem key={link.tiny_url} link={link} />
					<hr className='hr-large'/>
				</>
			);
		});
	};

	return (
		<div>
			{createLinklist()}
		</div>
	);
};

export {
	LinkList
};