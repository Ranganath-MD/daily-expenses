'use client';

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { ToggleTheme } from "./toggle-theme";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Header = () => {
	const { theme } = useTheme();
	return (
		<header className="flex justify-between items-center p-2">
			<h1 className="text-2xl font-bold">Personal Expense Tracker</h1>
			<div className="flex gap-4">
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton
						appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
					/>
				</SignedIn>
				<ToggleTheme />
			</div>
		</header>
	);
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className="m-auto md:max-w-screen-md p-4">
			<Header />
			{children}
		</div>
	);
};
