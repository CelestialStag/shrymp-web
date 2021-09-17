import { State, UseStore } from 'zustand';
import { createContext, useContext } from 'react';

import { StoreState } from './store';

interface Props { 
	children: React.ReactNode;
	store: UseStore<StoreState & Record<string | number | symbol, unknown>> | any;
}

export const StoreContext = createContext<Props['store']>(null);

export const StoreProvider = ({ children, store }: Props) => {
	return(
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	);
};

export const useStore = (selector: (state: StoreState & State) => any, eqFn) => {
	const store = useContext(StoreContext);
	const values = store(selector, eqFn);
	return values;
};