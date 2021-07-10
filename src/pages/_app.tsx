import type { AppProps } from 'next/app';

import 'stagcss';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
