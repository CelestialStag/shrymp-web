import style from './Overlay.module.scss';

interface Props {
	children: React.ReactNode;
	hidden: boolean;
	onClick: () => void;
}

const Overlay = (props: Props) => {
	return (
		<div>
			<div onClick={props.onClick}
				className={props.hidden ? style.overlayHidden : style.overlay}>
			</div>
			<div>
				{props.children}
			</div>
		</div>
	);
};

export {
	Overlay
};