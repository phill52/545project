import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col justify-center align-center h-full home-grad px-[12%]">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/project/:id" element={<Project />} />
					<Route path="/project/create" element={<CreateProject />} />
					<Route path="/Projects" element={<Projects />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
