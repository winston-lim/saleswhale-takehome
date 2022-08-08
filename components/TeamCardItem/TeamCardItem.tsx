import styles from "./TeamCardItem.module.scss";
import Image from "next/image";
import {
	defaultAvatar,
	smallConversationsIcon,
	smallLeadsIcon,
	starActive,
	starDefault,
} from "../../assets/images";

type TeamCardItemProps = {
	team?: any;
};

const TeamCardItem = ({ team }: TeamCardItemProps) => {
	const {
		campaigns_count,
		created_at,
		description,
		image,
		is_archived,
		is_favorited,
		leads_count,
		name,
	} = team;
	return (
		<div className={styles.CardContainer}>
			<div className={styles.CardHeader}>
				<div className={styles.TeamDetail}>
					<Image
						className={styles.TeamDetailPhoto}
						unoptimized
						alt="team-photo"
						src={image || defaultAvatar}
						width="36"
						height="36"
					/>
					<div className={styles.TeamDetailInfo}>
						<div className={styles.TeamDetailInfoText}>
							<div className={styles.Title}>{name}</div>
							<div className={styles.Description}>Created on {created_at}</div>
						</div>
						<div className={styles.TeamDetailInfoIcon}>
							{is_favorited ? (
								<Image
									className={styles.TeamDetailPhoto}
									alt="star-active"
									src={starActive}
									width="16"
									height="16"
								/>
							) : (
								<Image
									className={styles.TeamDetailPhoto}
									alt="star-default"
									src={starDefault}
									width="16"
									height="16"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.CardBody}>
				<p className={styles.CardBodyText}>{description}</p>
			</div>
			<div className={styles.CardFooter}>
				<div className={styles.CardFooterItem}>
					<Image
						alt="icon-conversation"
						src={smallConversationsIcon}
						width="16"
						height="16"
					/>
				</div>
				<div className={styles.CardFooterText}>{campaigns_count} Campaigns</div>
				<div className={styles.CardFooterItem}>
					<Image alt="icon-leads" src={smallLeadsIcon} width="16" height="16" />
				</div>
				<div className={styles.CardFooterText}>{leads_count} Leads</div>
			</div>
		</div>
	);
};

export default TeamCardItem;
