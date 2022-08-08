import styles from "./Layout.module.scss";
import Image from "next/image";
import {
	salesWhaleIcon,
	campaignIcon,
	teamsIcon,
	leadsIcon,
	reportsIcon,
	helpIcon,
	mailIcon,
	defaultAvatar,
	caretDown,
} from "../../assets/images";
import Badge from "../Badge";

type LayoutProps = {
	user: any;
	children?: any;
};

const Layout = ({ user, children }: LayoutProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.SideBar}>
				<div className={styles.SideBarItem}>
					<Image
						className={styles.SideBarItemLogo}
						alt="saleswhale-icon"
						src={salesWhaleIcon}
						width="60"
						height="60"
					/>
				</div>
				<div className={styles.SideBarItem}>
					<Image
						className={styles.SideBarItemLogo}
						alt="campaign-icon"
						src={campaignIcon}
						width="60"
						height="60"
					/>
				</div>
				<div className={styles.SideBarItemSelected}>
					<Image
						className={styles.SideBarItemSelectedLogo}
						alt="teams-icon"
						src={teamsIcon}
						width="60"
						height="60"
					/>
				</div>
				<div className={styles.SideBarItem}>
					<Image
						className={styles.SideBarItemLogo}
						alt="leads-icon"
						src={leadsIcon}
						width="60"
						height="60"
					/>
				</div>
				<div className={styles.SideBarItem}>
					<Image
						className={styles.SideBarItemLogo}
						alt="reports-icon"
						src={reportsIcon}
						width="60"
						height="60"
					/>
				</div>
				<div className={styles.SideBarItem}>
					<Image
						className={styles.SideBarItemLogo}
						alt="help-icon"
						src={helpIcon}
						width="60"
						height="60"
					/>
				</div>
			</div>
			<div className={styles.MainContent}>
				<div className={styles.Header}>
					<div className={styles.HeaderAppName}>NARWHAL</div>
					<div className={styles.HeaderContent}>
						<div className={styles.HeaderContentTitle}>Teams</div>
						<div className={styles.HeaderContentActions}>
							<div className={styles.MailAction}>
								<Image
									// className={styles.SideBarItemLogo}
									alt="mail-icon"
									src={mailIcon}
									width="22"
									height="22"
								/>
								<Badge width={16} content={user.notifications_count} />
							</div>
							<div className={styles.UserActions}>
								<div className={styles.UserActionsTitle}>
									Hello, {user.name}
								</div>
								<div className={styles.UserActionsAvatar}>
									<Image
										className={styles.UserActionsAvatar}
										unoptimized
										alt="default-avatar"
										src={user.avatar || defaultAvatar}
										width="36"
										height="36"
									/>
								</div>
								<div className={styles.UserActionsButton}>
									<Image
										alt="caret-down"
										src={caretDown}
										width="10"
										height="10"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.Body}>
					<div className={styles.BodyContent}>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
