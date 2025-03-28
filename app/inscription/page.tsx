"use client";

import { useRouter } from "next/navigation";
import styles from "./inscription.module.css"; // vous pouvez garder ce nom de fichier CSS si vous le souhaitez

export default function Inscriptionpage() {
	const router = useRouter();

	const handleClick = (e: React.FormEvent) => {
		e.preventDefault();
		// router.push("/Actuality");
	};

	return (
		<div className={styles.inscription}>
			<form className={styles.cardInsctiption}>
				<h1 className={styles.inscriptionh1}>Inscription</h1>

				<label htmlFor="email">Adresse mail</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
					required
					className={styles.inputinscription}
				/>

				<label htmlFor="password" className={styles.passwordinscription}>
					Mot de passe
				</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
					required
					className={styles.inputinscription}
				/>

				<button
					type="button"
					onClick={handleClick}
					className={styles.submitinscription}
				>
					S'inscrire
				</button>
			</form>
		</div>
	);
}
