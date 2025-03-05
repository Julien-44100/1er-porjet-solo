// app/layout.tsx
import "./globals.css";
import NavBar from "./admin/NavBar/NavBar"; // Chemin à adapter selon votre arborescence

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
			</body>
		</html>
	);
}
