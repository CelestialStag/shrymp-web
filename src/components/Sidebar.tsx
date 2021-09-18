import style from './Sidebar.module.scss';

interface Props {
	children: React.ReactNode;
	hidden: boolean;
	toggle: boolean;
}

const Sidebar = (props: Props) => {
	return (
		<div className={
			props.hidden ? style.sidebar + ' ' + style.hidden
				: (props.toggle
					? style.sidebar + ' ' + style.slideIn
					: style.sidebar + ' ' + style.slideOut)
		}>
			<div className={style.sidebarContainer}>
				<h4>
					your recently created links
				</h4>
				<div className={style.linkListContainer}>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export {
	Sidebar
};