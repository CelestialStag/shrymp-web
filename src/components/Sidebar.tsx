import style from './Sidebar.module.scss';

interface Props {
	children: React.ReactNode;
	hidden: boolean;
}

const Sidebar = (props: Props) => {
	return (
		<div className={props.hidden ? style.sidebarHidden : style.sidebar + ' container'}>
			{props.children}
		</div>
	);
};

export {
	Sidebar
};