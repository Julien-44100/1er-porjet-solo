"use client";

import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

interface NavBarProps {
	user?: unknown;
}

export default function NavBar({ user }: NavBarProps) {
	const [alternator, setAlternator] = useState<[boolean, boolean]>([
		true,
		false,
	]);

	useEffect(() => {
		setAlternator(!user ? [true, false] : [false, true]);
	}, [user]);

	return (
		<div className={styles.navbar}>
			{alternator[1] && (
				<button type="button" className={styles.authButton}>
					Connexion
				</button>
			)}
			{alternator[0] && (
				<button type="button" className={styles.authButton}>
					Inscription
				</button>
			)}
		</div>
	);
}
