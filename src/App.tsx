import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import pages from "./data.json";
import logo from "./logo.svg";

interface HomeProps {
	children?: JSX.Element;
}
function Home(props: HomeProps) {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>

				<div>{props.children}</div>
			</header>
		</div>
	);
}

function PageItem(props: typeof pages[number]) {
	console.log(props);
	return <></>;
}

function App() {
	const routes = (
		<Routes>
			{pages.map((page) => {
				return (
					<Route
						key={page.id}
						path={"/page/" + page.id + ".html"}
						element={<PageItem {...page} />}
					></Route>
				);
			})}
		</Routes>
	);
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			{routes}
			<Routes>
				<Route
					path="*"
					element={
						<Home>
							<>
								{getRoutes(routes)
									.map((str) => {
										return <Link to={str}>{str}</Link>;
									})
									.reduce((prev, curr) => (
										<>
											{prev}
											<p></p>
											{curr}
										</>
									))}
							</>
						</Home>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

/**
 * Get list of paths
 * @param routes
 */
function getRoutes(routes: JSX.Element) {
	const paths: any[] = [];
	/**
	 * Walk in list of routes tree
	 * @param element
	 */
	const walkTree = (element: JSX.Element) => {
		if (element.props.children && element.props.children.length > 0) {
			element.props.children.forEach((elem: JSX.Element) => walkTree(elem));
		} else if (element.props.path && typeof element.props.path === "string") {
			paths.push(element.props.path);
		}
	};
	walkTree(routes);
	return paths;
}
