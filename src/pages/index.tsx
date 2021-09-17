import { useState } from 'react';

import { Domain } from 'lib/types';
import { createStore } from 'lib/store/store';

import { loadDomains } from 'lib/LinkTool';

import { LinkTool } from '../components/LinkTool';
import { MenuButton } from 'components/MenuButton';
import { Overlay } from '../components/Overlay';
import { Sidebar } from '../components/Sidebar';

interface Props {
	store: ReturnType<typeof createStore>;
	domainList: Domain[];
}

const Index = (props: Props) => {
	
	const [ overlayHidden, useOverlayHidden ] = useState(true);

	const CloseOverlay = () => {
		useOverlayHidden(true);
	};

	const OpenOverlay = () => {
		useOverlayHidden(false);
	};
	
	return (
		<div className='container full-height center'>
			<Overlay hidden={overlayHidden} onClick={CloseOverlay}>
				<MenuButton onClick={OpenOverlay} />
				<LinkTool domainList={props.domainList} />
			</Overlay>
			<Sidebar hidden={overlayHidden}>
			</Sidebar>
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