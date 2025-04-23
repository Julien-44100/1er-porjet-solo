"use client";

import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<div className={styles.footer}>
			<img
				src="/images/copyright-logo.png"
				alt="Logo copyright"
				width={40}
				height={40}
			/>
		</div>
	);
}
