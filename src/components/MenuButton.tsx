import { FiMenu } from 'react-icons/fi';

import style from './MenuButton.module.scss';

interface Props {
	children?: React.ReactNode;
	rotate?: boolean;
	animate?: boolean;
	onClick: () => void;
}

const MenuButton = (props: Props) => {
	return (
		<FiMenu className={`${style.menuButton} ${!props.animate ? '' : props.rotate
			? style.menuButtonOpen : style.menuButtonClose}`}
		onClick={props.onClick} />
	);
};

export {
	MenuButton
};