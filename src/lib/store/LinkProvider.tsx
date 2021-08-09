import { UseStore } from 'zustand';
import { createContext } from 'react';

import { LinkState } from './link.store';

interface Props { 
	children: React.ReactNode;
	store: UseStore<LinkState & Record<string | number | symbol, unknown>>;
}

export const StoreContext = createContext<Props['store']>(null);

export const StoreProvider = ({ children, store }: Props) => {
	return(
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	);
};