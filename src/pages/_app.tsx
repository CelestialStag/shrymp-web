import type { AppProps } from 'next/app';
import React from 'react';

import { StoreProvider } from '../lib/store/StoreProvider';
import { createStore, useHydrate } from '../lib/store/store';

import 'stagcss';
import 'stagcss/dist/stag-ext.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const state = pageProps.state ? pageProps.state : createStore(pageProps.state);
	const store = useHydrate(state);
	
	return (
		<StoreProvider store={store}>
			<Component {...pageProps} />
		</StoreProvider>
	);
};

export default MyApp;