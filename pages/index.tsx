import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { companiesIcon, plusIcon, teamsIcon } from "../assets/images";
import TeamCardItem from "../components/TeamCardItem";
import ActivityCardItem from "../components/ActivityCardItem";
import path from "path";
import { promises as fs } from "fs";
import getData from "./api/data";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";

const paginationSize = 15;

const Home: NextPage = ({
	user,
	// all list of teams are split into chunks of size=$paginationSize defined globally
	allTeams,
	favouritedTeams,
	archivedTeams,
	teamSize,
	activities,
}: any) => {
	/* State */
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState("none");
	const [displayTeams, setDisplayTeams] = useState([]);
	const [hasMore, setHasMore] = useState<boolean>();

	/* Effects */
	useEffect(() => {
		let teams = [] as any;
		// Get teams to display
		if (filter == "none") {
			// If no filters are applied, use `allTeams` list of teams
			for (let pageNumber = 0; pageNumber < currentPage; ++pageNumber) {
				allTeams[pageNumber].forEach((team: any) => teams.push(team));
			}
			setHasMore(currentPage < allTeams.length);
		} else {
			// If filters are applied, use respective filtered list of teams
			if (filter == "favourites") {
				for (let pageNumber = 0; pageNumber < currentPage; ++pageNumber) {
					favouritedTeams[pageNumber].forEach((team: any) => teams.push(team));
				}
				setHasMore(currentPage < favouritedTeams.length);
			} else if (filter == "archived") {
				for (let pageNumber = 0; pageNumber < currentPage; ++pageNumber) {
					archivedTeams[pageNumber].forEach((team: any) => teams.push(team));
				}
				setHasMore(currentPage < archivedTeams.length);
			}
		}
		setDisplayTeams(teams);
	}, [currentPage, allTeams, favouritedTeams, archivedTeams, filter]);

	/* Callback functions */
	const handleShowMore = () => {
		setCurrentPage(currentPage + 1);
	};
	const handleFilterChange = (filter: string) => {
		setFilter(filter);
		// reset page to 1
		setCurrentPage(1);
	};

	return (
		<Layout user={user}>
			<div className={styles.container}>
				<div className={styles.Header}>
					<div className={styles.HeaderTitle}>
						<Image
							className={styles.HeaderTitleIcon}
							alt="companies-icon"
							src={companiesIcon}
							width="30"
							height="30"
						/>
						<div className={styles.HeaderTitleText}>Teams</div>
					</div>
					<div className={styles.HeaderAction}>
						<Image
							className={styles.HeaderActionIcon}
							alt="plus-icon"
							src={plusIcon}
							width="16"
							height="16"
						/>
						<div className={styles.HeaderActionText}>CREATE NEW TEAM</div>
					</div>
				</div>
				<div className={styles.NavBar}>
					<div
						className={
							filter == "none" ? styles.NavBarItemSelected : styles.NavBarItem
						}
						onClick={() => handleFilterChange("none")}
					>
						All
					</div>
					<div
						className={
							filter == "favourites"
								? styles.NavBarItemSelected
								: styles.NavBarItem
						}
						onClick={() => handleFilterChange("favourites")}
					>
						Favourites
					</div>
					<div
						className={
							filter == "archived"
								? styles.NavBarItemSelected
								: styles.NavBarItem
						}
						onClick={() => handleFilterChange("archived")}
					>
						Archived
					</div>
					<div className={styles.NavBarItem}></div>
				</div>
				<div className={styles.Body}>
					<div className={styles.TeamCard}>
						<div className={styles.TeamCardHeader}>
							<div className={styles.TeamCardHeaderTitle}>All Teams</div>
							<div className={styles.TeamCardHeaderSubTitle}>
								Showing {displayTeams.length} out of {teamSize} teams
							</div>
						</div>
						<div className={styles.TeamCardBody}>
							{displayTeams.map((team: any) => {
								const { id } = team;
								return <TeamCardItem key={id} team={team} />;
							})}
						</div>
						{hasMore && (
							<div className={styles.TeamCardButton} onClick={handleShowMore}>
								Show more
							</div>
						)}
						{!hasMore && currentPage > 1 && (
							<div style={{ alignSelf: "center", color: "black" }}>
								No more teams to show
							</div>
						)}
					</div>
					<div className={styles.ActivityCard}>
						<div className={styles.ActivityCardHeader}>
							<div className={styles.ActivityCardHeaderTitle}>Activity</div>
						</div>
						<div className={styles.ActivityCardBody}>
							{activities.map((activity: any) => {
								const { id } = activity;
								return <ActivityCardItem key={id} activity={activity} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps() {
	// Imitating a mock api call
	const data = await getData().then((data) => JSON.parse(data));
	const { current_user: user, teams, activities } = data;

	// Get lists of teams
	const favouritedTeams = teams.filter((team: any) => team.is_favorited);
	const archivedTeams = teams.filter((team: any) => team.is_archived);
	const paginatedTeams = [];
	const paginatedFavouritedTeams = [];
	const paginatedArchivedTeams = [];
	let start = 0;
	// Get all teams
	while (start < teams.length) {
		const chunk = [];
		for (let i = 0; i < paginationSize; ++i) {
			if (start + i == teams.length) break;
			chunk.push(teams[start + i]);
		}
		start += paginationSize;
		paginatedTeams.push(chunk);
		if (start == teams.length - 1) {
			paginatedTeams.push([teams[start]]);
			break;
		}
	}
	// Get favourites teams
	start = 0;
	while (start < favouritedTeams.length) {
		const chunk = [];
		for (let i = 0; i < paginationSize; ++i) {
			if (start + i == favouritedTeams.length) break;
			chunk.push(favouritedTeams[start + i]);
		}
		start += paginationSize;
		paginatedFavouritedTeams.push(chunk);
		if (start == favouritedTeams.length - 1) {
			paginatedFavouritedTeams.push([favouritedTeams[start]]);
			break;
		}
	}
	// Get archived teams
	start = 0;
	while (start < archivedTeams.length) {
		const chunk = [];
		for (let i = 0; i < paginationSize; ++i) {
			if (start + i == archivedTeams.length) break;
			chunk.push(archivedTeams[start + i]);
		}
		start += paginationSize;
		paginatedArchivedTeams.push(chunk);
		if (start == archivedTeams.length - 1) {
			paginatedArchivedTeams.push([archivedTeams[start]]);
			break;
		}
	}

	// Sort activities by $created_at
	const sortedActivities = activities.sort((a: any, b: any) => {
		// We consider `created_at: undefined` as most recent
		if (!a?.created_at) return -1;
		if (!b?.created_at) return 1;
		if (a.created_at[0] > b.created_at[0]) return 0;
		return a.created_at[0] < b.created_at[0] ? -1 : 1;
	});

	return {
		props: {
			user,
			allTeams: paginatedTeams,
			favouritedTeams: paginatedFavouritedTeams,
			archivedTeams: paginatedArchivedTeams,
			activities: sortedActivities,
			teamSize: teams.length,
		},
	};
}

export default Home;
