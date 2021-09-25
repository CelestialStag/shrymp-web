import { NextPage } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import config from '../../config/opengraph.json';

interface Props {
	openGraph?: NextSeoProps;
}

export const OpenGraph: NextPage<Props> = (props: Props) => {
	return(
		<NextSeo {...config} {...props.openGraph} twitter={{ cardType: '' }} openGraph={{ images: config.image }} />
	);
};