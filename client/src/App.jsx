import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Profile from "./pages/auth/profile";
import Register from "./pages/auth/register";
import Home from "./pages/site/home";
import NotFound from "./pages/site/not-found";

import "bootstrap/dist/js/bootstrap";

import AuthLayout from "./layouts/auth-layout";

function App() {
	return (
		<AuthLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthLayout>
	);
}

export default App;
