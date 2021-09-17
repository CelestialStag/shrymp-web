import { createStore } from 'lib/store/store';

import { LinkTool } from '../components/LinkTool';

const Index = () => {
	return (
		<div className='container full-height center'>
			<LinkTool />
		</div>
	);
};

export function getServerSideProps() {
	const store = createStore();

	return {
	 	props: {
			state: JSON.stringify({
				...store.getState()
			})
		}
	};
}

export default Index;