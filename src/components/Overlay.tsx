import style from './Overlay.module.scss';

interface Props {
	children: React.ReactNode;
	hidden: boolean;
	toggle: boolean;
	onClick: () => void;
}

const Overlay = (props: Props) => {
	return (
		<div>
			<div onClick={props.onClick} className={
				props.hidden ? style.overlay + ' ' + style.hidden
					: (props.toggle
						? style.overlay + ' ' + style.slideIn
						: style.overlay + ' ' + style.slideOut)
			}>
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