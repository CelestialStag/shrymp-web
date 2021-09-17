import { useState } from 'react';

import { Domain } from 'lib/types';
import { createStore } from 'lib/store/store';

import { loadDomains } from 'lib/LinkTool';
import { useStore } from 'lib/store/StoreProvider';

import { LinkList } from '../components/LinkList';
import { LinkTool } from '../components/LinkTool';
import { MenuButton } from 'components/MenuButton';
import { Overlay } from '../components/Overlay';
import { Sidebar } from '../components/Sidebar';

interface Props {
	store: ReturnType<typeof createStore>;
	domainList: Domain[];
}

const Index = (props: Props) => {
	const linkList = useStore(state => state.link_list);
	
	const [ overlayHidden, useOverlayHidden ] = useState(true);

	const ToggleOverlay = () => {
		useOverlayHidden(!overlayHidden);
	};

	const CloseOverlay = () => {
		useOverlayHidden(true);
	};

	return (
		<div className='container full-height center'>
			<Overlay hidden={overlayHidden} onClick={CloseOverlay}>
				<MenuButton onClick={ToggleOverlay} />
				<LinkTool domainList={props.domainList} />
			</Overlay>
			<Sidebar hidden={overlayHidden}>
				<LinkList linkList={linkList} />
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