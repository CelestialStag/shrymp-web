import { persist } from 'zustand/middleware';
import create, { State } from 'zustand';

import { Link } from '../types';
import { LinkAction } from './store.enum';

export interface LinkState {
	dispatch: (action: any) => any;
	link_list?: Link[];
}

const defaultState: LinkState & State = {
	dispatch: (args) => args,
	link_list: null
};

const reducer = (currentState = defaultState, state): any => {
	switch (state.type) {
	case LinkAction.ADD_LINK:
		return { ...currentState, ...state, loggedIn: true };
	case LinkAction.DELETE_LINK:
		return { ...currentState, loggedIn: false };
	}
};

const useStore = create<LinkState & State>(
	persist((set) => {
		return {
			...defaultState,
			dispatch: args => set(state => reducer(state, args))
		};
	}, {
		name: 'link-store',
		getStorage: () => localStorage
	})
);

export const linkStore = useStore;