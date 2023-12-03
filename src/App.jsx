import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";

function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/project/:id" element={<Project />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
