import { useMemo } from 'react';

import { persist } from 'zustand/middleware';
import create, { State } from 'zustand';

import { Link } from '../types';
import { LinkAction } from './store.enum';

export interface StoreState {
	dispatch: (action: any) => any;
	link_list: Link[];
	created_link?: string;
	deleted_link?: string;
}

let store;

const defaultState: StoreState & State = {
	dispatch: (args) => args,
	link_list: [],
	created_link: '',
	deleted_link: ''
};

const reducer = (currentState = defaultState, state): any => {
	switch (state.type) {
	case LinkAction.ADD_LINK:
		return { ...currentState, ...state, loggedIn: true };
	case LinkAction.DELETE_LINK:
		return { ...currentState };
	case LinkAction.CREATE_LINK:
		return {
			created_link: state.created_link,
			link_list: [
				...currentState.link_list,
				state.created_link
			]
		};
	default:
		return {
			...currentState,
			created_link: '',
			deleted_link: ''
		};
	}
};

const initStore = (loadedState = defaultState) => {
	return create<StoreState & State>(
		persist((set) => {
			return {
				...defaultState,
				...loadedState,
				dispatch: args => set(state => reducer(state, args))
			};
		}, {
			name: 'link-store',
			getStorage: () => localStorage
		})
	);
};


export const createStore = (loadedState?) => {
	let _store = store ?? initStore(loadedState);

	if (loadedState && store) {
		_store = initStore({
		  ...store.getState(),
		  ...loadedState
		});
		// Reset the current store
		store = undefined;
	  }
	
	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export function useHydrate(defaultState) {
	const state = typeof defaultState === 'string' ? JSON.parse(defaultState) : defaultState;
	const store = useMemo(() => createStore(state), [ state ]);
	return store;
}

  