import { Domain } from 'lib/types';
import { createStore } from 'lib/store/store';

import { LinkTool } from '../components/LinkTool';
import { loadDomains } from 'lib/LinkTool';

interface Props {
	store: ReturnType<typeof createStore>;
	domainList: Domain[];
}

const Index = (props: Props) => {
	return (
		<div className='container full-height center'>
			<LinkTool domainList={props.domainList} />
		</div>
	);
};

export const getServerSideProps = async () => {
	const store = createStore();
	
	return {
	 	props: {
			domainList: await loadDomains(),
			state: JSON.stringify({
				...store.getState()
			})
		}
	};
};

export default Index;