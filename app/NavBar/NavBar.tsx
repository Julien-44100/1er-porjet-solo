"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- Import du hook pour connaître la route
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
		</div>
	);
}
