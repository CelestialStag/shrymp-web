import { useMemo } from 'react';

import { persist } from 'zustand/middleware';
import create, { State, UseStore } from 'zustand';

import { Link } from '../types';
import { LinkAction } from './store.enum';

export interface StoreState {
	dispatch?: (action: State) => any;
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

const reducer = (currentState = defaultState, state)
: Partial<StoreState> & StoreState | Pick<StoreState, keyof StoreState> => {
	const createdLink = state.created_link;
	
	switch (state.type) {
	case LinkAction.ADD_LINK:
		return { ...currentState, ...state, loggedIn: true };
	case LinkAction.DELETE_LINK:
		return {
			link_list: currentState.link_list.filter((link) => {
				return link.tiny_url !== state.deleted_link;
			})
		};
	case LinkAction.CREATE_LINK:
		if(createdLink.domain && createdLink.tiny_url) {
			return {
				created_link: `http://${createdLink.domain}/${createdLink.tiny_url}`,
				link_list: [
					...currentState.link_list,
					state.created_link
				]
			};
		} else {
			if(createdLink.errors) {
				return {
					...defaultState,
					created_link: 'Error: Invalid URL'
				};
			} else {
				return {
					...defaultState,
					created_link: 'Error: Unknown Error'
				};
			}
		}
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
		_store.getState().dispatch({ type: LinkAction.HYDRATE });
		// Reset the current store
		store = undefined;
	  }

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;
	  
	return _store;
};

export const useHydrate = (defaultState) => {
	const state: UseStore<StoreState> = typeof defaultState === 'string' ? JSON.parse(defaultState) : defaultState;
	const store: UseStore<StoreState> = useMemo(() => createStore(state), [ state ]);
	return store;
};

  