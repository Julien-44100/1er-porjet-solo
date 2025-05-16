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

		if (!file) {
			alert("Veuillez choisir une photo avant d'envoyer.");
			return;
		}

		const formData = new FormData();
		formData.append("photo", file);
		formData.append("name_actuality", nameActuality);
		formData.append("actuality", actuality);

		try {
			// dans votre handleSubmit (page.tsx)
			const res = await fetch("/api/actualities/upload", {
				method: "POST",
				body: formData,
			});
			if (!res.ok) {
				const err = await res.json();
				console.error("Erreur back:", err);
				alert("Impossible d’ajouter l’actualité.");
				return;
			}
			const { data } = await res.json();
			// vous pouvez ensuite récupérer `data.filename` pour afficher l’image
			alert("Actualité ajoutée avec succès !");
			// …
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
