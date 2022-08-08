import styles from "./ActivityCardItem.module.scss";
import Image from "next/image";
import { defaultAvatar } from "../../assets/images";

type ActivityCardItemProps = {
	activity: any;
};

const ActivityCardItem = ({ activity }: ActivityCardItemProps) => {
	const {
		action,
		created_at,
		person: { name, avatar },
		target,
	} = activity;

	const renderActivityDescription = () => {
		switch (action) {
			case "archived_team": {
				return `${name} archived the team ${target}`;
			}
			case "increased_quota": {
				return `${name} increased ${target}'s quota`;
			}
			case "added_leads": {
				return `${name} added new leads to ${target}`;
			}
		}
	};
	return (
		<div className={styles.Activity}>
			<div className={styles.ActivityAvatarContainer}>
				<Image
					className={styles.ActivityAvatarImage}
					unoptimized
					alt="activity-avatar"
					src={avatar || defaultAvatar}
					width="36"
					height="36"
				/>
			</div>
			<div className={styles.ActivityDetail}>
				<div className={styles.ActivityDetailDescription}>
					{renderActivityDescription()}
				</div>
				<div className={styles.ActivityDetailTime}>
					{created_at ? created_at : "Recently"}
				</div>
			</div>
		</div>
	);
};

export default ActivityCardItem;
