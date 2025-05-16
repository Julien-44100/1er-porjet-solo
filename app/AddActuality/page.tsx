"use client";
import styles from "./AddActuality.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅

function AddActuality() {
	const [nameActuality, setNameActuality] = useState("");
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
	const [actuality, setActuality] = useState("");
	const router = useRouter(); // ✅

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedPhoto(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const formData = {
			name_actuality: nameActuality,
			add_photo: selectedPhoto,
			actuality: actuality,
		};

		try {
			const response = await fetch("/api/actualities", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Actualité ajoutée avec succès !");
				setNameActuality("");
				setSelectedPhoto(null);
				setActuality("");

				router.replace("/actuality"); // ✅ Navigation Next.js
			} else {
				alert("Erreur lors de l'ajout de l'actualité.");
			}
		} catch (error) {
			console.error("Erreur :", error);
		}
	};
	return (
		<div className={styles.card}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className={styles.title}>Nom de l’actualité</h1>
				<input
					type="text"
					name="name_actuality"
					placeholder="Entrez le titre de l’actualité"
					required
					value={nameActuality}
					onChange={(e) => setNameActuality(e.target.value)}
				/>

				<h2 className={styles.subtitle}>Ajouter une photo</h2>
				<label htmlFor="photo-upload" className={styles.uploadLabel}>
					<input
						type="file"
						accept="image/*"
						id="photo-upload"
						className={styles.fileInput}
						onChange={handlePhotoChange}
					/>
				</label>

				{selectedPhoto && (
					<div className={styles.photoPreview}>
						<img src={selectedPhoto} alt="Aperçu" />
					</div>
				)}

				<label htmlFor="actuality" className={styles.subtitle}>
					Actualité
				</label>
				<input
					type="text"
					id="actuality"
					name="actuality"
					placeholder="Votre texte ici"
					required
					value={actuality}
					onChange={(e) => setActuality(e.target.value)}
				/>

				<button type="submit" className={styles.submitButton}>
					Envoyer
				</button>
			</form>
		</div>
	);
}

export default AddActuality;
