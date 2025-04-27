"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
	const pathname = usePathname();

	return (
		<div className={styles.navbar}>
			{/* Si on est sur "/", on affiche le bouton "Inscription" */}
			{pathname === "/" && (
				<Link href="/inscription">
					<button type="button" className={styles.authButton}>
						Inscription
					</button>
				</Link>
			)}

			{/* Si on est sur "/inscription", on affiche le bouton "Connexion" */}
			{pathname === "/inscription" && (
				<Link href="/">
					<button type="button" className={styles.authButton}>
						Connexion
					</button>
				</Link>
			)}

			{/* **Seulement** quand on est sur "/actuality" */}
			{pathname === "/actuality" && (
				<Link href="/addactuality">
					<button type="button" className={styles.authButton}>
						Add Actuality
					</button>
				</Link>
			)}
			{pathname === "/addactuality" && (
				<Link href="/actuality">
					<button type="button" className={styles.authButton}>
						Actuality
					</button>
				</Link>
			)}
		</div>
	);
}
