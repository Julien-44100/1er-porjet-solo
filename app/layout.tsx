// app/layout.tsx
import "./globals.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./footer/Footer";
// import Connexion from "./connexion/Connexion";

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
				<Footer />
			</body>
		</html>
	);
}
