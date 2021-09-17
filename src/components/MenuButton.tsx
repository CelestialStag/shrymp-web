import { FiMenu } from 'react-icons/fi';

import style from './MenuButton.module.scss';

interface Props {
	children?: React.ReactNode;
	onClick: () => void;
}

const MenuButton = (props: Props) => {
	return (
		<FiMenu className={style.menuButton}
			onClick={props.onClick} />
	);
};

export {
	MenuButton
};