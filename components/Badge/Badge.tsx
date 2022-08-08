import React from "react";
import styles from "./Badge.module.scss";

type BadgeProps = {
	content: any;
	width: number;
};

const Badge = ({ content, width }: BadgeProps) => {
	return (
		<div
			style={{
				width: `${width}px`,
				height: `${width}px`,
				top: `-${width / 2}px`,
				right: `-${width / 2}px`,
			}}
			className={styles.Badge}
		>
			{content}
		</div>
	);
};

export default Badge;
