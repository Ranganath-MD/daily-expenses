import { ToggleTheme } from "./toggle-theme";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-2">
      <h1 className="text-2xl font-bold">
        Personal Expense Tracker
      </h1>
      <ToggleTheme />
    </header>
  )
}

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
