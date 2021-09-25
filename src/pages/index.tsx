import { useState } from 'react';

import Image from 'next/image';

import { Domain } from 'lib/types';
import { createStore } from 'lib/store/store';

import { loadDomains } from 'lib/LinkTool';
import { useStore } from 'lib/store/StoreProvider';

import { LinkList } from '../components/LinkList';
import { LinkTool } from '../components/LinkTool';
import { MenuButton } from 'components/MenuButton';
import { OpenGraph } from '../components/OpenGraph';
import { Overlay } from '../components/Overlay';
import { Sidebar } from '../components/Sidebar';

import siteLogo from '../../public/img/logo.png';
interface Props {
	store: ReturnType<typeof createStore>;
	domainList: Domain[];
}

const Index = (props: Props) => {
	const linkList = useStore(state => state.link_list);
	
	const [ hidden, useHidden ] = useState(true);
	const [ toggle, useToggle ] = useState(false);

	const ToggleOverlay = () => {
		useHidden(false);
		useToggle(!toggle);
	};

	const CloseOverlay = () => {
		useHidden(false);
		useToggle(!toggle);
	};
	
	return (
		<div className='container full-height center'>
			<MenuButton onClick={ToggleOverlay} animate={!hidden} rotate={toggle} />
			<OpenGraph />
			<Overlay hidden={hidden} toggle={toggle} onClick={CloseOverlay}>
				<div className='mainContainer'>
					<Image src={siteLogo} alt="site logo"
						width="100%" height="100%" placeholder="blur"
						layout="fixed" className='siteLogo'/>
					<LinkTool domainList={props.domainList} />
				</div>
			</Overlay>
			<Sidebar hidden={hidden} toggle={toggle}>
				<MenuButton onClick={ToggleOverlay} animate={!hidden} rotate={toggle} />
				<LinkList linkList={linkList} header='Recent Creations' />
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