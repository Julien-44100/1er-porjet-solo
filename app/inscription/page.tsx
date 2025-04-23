"use client";

import Link from "next/link";
import styles from "./inscription.module.css";
import { useRouter } from "next/navigation";
// Séparer l'import des types
import type { FormEvent } from "react";
import { useState } from "react";

export default function Inscriptionpage() {
	const router = useRouter();

	// États du formulaire
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Gestion de la soumission
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.error || "Erreur lors de la création du compte");
			} else {
				alert("Compte créé avec succès !");
				router.push("/");
			}
		} catch (error) {
			console.error(error);
			alert("Erreur de réseau ou de serveur.");
		}
	};

	return (
		<div className={styles.inscription}>
			<form className={styles.cardInsctiption} onSubmit={handleSubmit}>
				<h1 className={styles.inscriptionh1}>Inscription</h1>

				<label htmlFor="email">Adresse mail</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
					required
					className={styles.inputinscription}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="password" className={styles.passwordinscription}>
					Mot de pass
				</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="Enter your password"
					required
					className={styles.inputinscription}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit" className={styles.submitinscription}>
					S'inscrire
				</button>

				<section className="register-yet">
					Déjà inscrit ?
					<p>
						<Link id="nav-link" href="/">
							Se connecter
						</Link>
					</p>
				</section>
			</form>
		</div>
	);
}
