// app/addactuality/page.tsx
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddActuality.module.css";

export default function AddActuality() {
	const [nameActuality, setNameActuality] = useState("");
	const [actuality, setActuality] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();

	function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
		const f = e.target.files?.[0] ?? null;
		setFile(f);
		if (f) {
			const reader = new FileReader();
			reader.onload = () => setPreview(reader.result as string);
			reader.readAsDataURL(f);
		} else {
			setPreview(null);
		}
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!file || !preview) {
			alert("Veuillez choisir une photo avant d'envoyer.");
			return;
		}

		try {
			const response = await fetch("/api/actualities", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name_actuality: nameActuality,
					add_photo: preview, // base64 de l'image
					description_actuality: actuality,
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				console.error("Erreur back:", err);
				alert("Impossible d’ajouter l’actualité !");
				return;
			}

			alert("Actualité ajoutée avec succès !");
			// router.push("/actuality");
		} catch (err) {
			console.error(err);
			alert("Erreur réseau lors de l’envoi.");
		}
	}

	return (
		<div className={styles.card}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Nom de l’actualité</h1>
				<input
					type="text"
					placeholder="Entrez le titre"
					value={nameActuality}
					onChange={(e) => setNameActuality(e.target.value)}
					required
				/>

				<h2 className={styles.subtitle}>Ajouter une photo</h2>
				<input
					type="file"
					accept="image/*"
					onChange={handlePhotoChange}
					required
				/>
				{preview && (
					<div className={styles.photoPreview}>
						<img src={preview} alt="aperçu" />
					</div>
				)}

				<h2 className={styles.subtitle}>Actualité</h2>
				<input
					type="text"
					placeholder="Votre texte ici"
					value={actuality}
					onChange={(e) => setActuality(e.target.value)}
					required
				/>

				<button type="submit" className={styles.submitButton}>
					Envoyer
				</button>
			</form>
		</div>
	);
}
