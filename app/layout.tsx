// app/layout.tsx
import "./globals.css";
import NavBar from "./admin/NavBar/NavBar"; // Chemin à adapter selon votre arborescence
import Connexion from "./admin/connexion/Connexion";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				{children}
				<Connexion />
			</body>
		</html>
	);
}
