import style from './Sidebar.module.scss';

interface Props {
	children: React.ReactNode;
	hidden: boolean;
}

const Sidebar = (props: Props) => {
	return (
		<div className={props.hidden ? style.sidebarHidden : style.sidebar + ' container'}>
			<div className={style.sidebarContainer}>
				<h4>
					your recently created links
				</h4>
				<div>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export {
	Sidebar
};