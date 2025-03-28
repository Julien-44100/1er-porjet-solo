// "use client";

// import { useRouter } from "next/navigation";
// import styles from "./Connexion.module.css";

// export default function Connexion() {
// 	const router = useRouter();

// 	const handleClick = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		// router.push("/Actuality");
// 	};

// 	return (
// 		<div className={styles.connexion}>
// 			<form className={styles.cardConnexion}>
// 				<h1 className={styles.connexionH1}>Connexion</h1>

// 				<label htmlFor="email">Adresse mail</label>
// 				<input
// 					type="email"
// 					id="email"
// 					name="email"
// 					placeholder="Enter your email"
// 					required
// 					className={styles.input}
// 				/>

// 				<label htmlFor="password" className={styles.password}>
// 					Mot de passe
// 				</label>
// 				<input
// 					type="password"
// 					id="password"
// 					name="password"
// 					placeholder="Enter your password"
// 					required
// 					className={styles.input}
// 				/>

// 				<button type="button" onClick={handleClick} className={styles.submit}>
// 					Se connecter
// 				</button>
// 			</form>
// 		</div>
// 	);
// }
