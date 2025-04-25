"use client";

import styles from "./Actuality.module.css";
import { useEffect, useState } from "react";

type ActualityType = {
	id: number;
	name_actuality: string;
	add_photo: string;
	actuality: string;
};

export default function Actuality() {
	const [actualities, setActualities] = useState<ActualityType[]>([]);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/actualities"`)
			.then((res) => res.json())
			.then((data) => setActualities(data))
			.catch((err) =>
				console.error("Erreur lors de la récupération des actualités :", err),
			);
	}, []);

	return (
		<div className={styles.listingActuality}>
			<h1 className={styles.actualityTitle}>Liste des Actualités</h1>
			{actualities.length > 0 ? (
				actualities.map((a) => (
					<div key={a.id} className={styles.actualityCard}>
						<h2>{a.name_actuality}</h2>
						{a.add_photo && <img src={a.add_photo} alt={a.name_actuality} />}
						<p>{a.actuality}</p>
					</div>
				))
			) : (
				<section className={styles.noActuality}>
					<p>Aucune actualité pour le moment.</p>
				</section>
			)}
		</div>
	);
}
