import "./globals.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./footer/Footer";
import Actualitypage from "./actuality/page";

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
