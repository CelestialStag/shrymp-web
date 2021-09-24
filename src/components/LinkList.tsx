import { Link } from '../lib/types';
import { LinkListItem } from './LinkListItem';

interface Props {
	children?: React.ReactNode;
	header: string;
	linkList: Link[];
}

const LinkList = (props: Props) => {
	const createLinklist = () => {
		return props.linkList.map((link: Link) => {
			return (
				<blockquote key={link.tiny_url}>
					<LinkListItem key={link.tiny_url} link={link} />
				</blockquote>
			);
		});
	};
	
	return (
		<>
			<h1>
				{props.header}
			</h1>
			{createLinklist()}
		</>
	);
};

export {
	LinkList
};