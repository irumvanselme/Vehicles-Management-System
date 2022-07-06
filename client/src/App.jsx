import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Profile from "./pages/auth/profile";
import Register from "./pages/auth/register";
import Home from "./pages/site/home";
import NotFound from "./pages/site/not-found";

import "bootstrap/dist/js/bootstrap";

import AuthLayout from "./layouts/auth-layout";
import { Dashboard } from "./pages/app/dashboard";
import { NewVehicle } from "./pages/app/new-vehicle";
import { NewCarOwner } from "./pages/app/new-car-owner";
import { Assign } from "./pages/app/assign";
import { CarOwners } from "./pages/app/vehicle-owners";

function App() {
	return (
		<AuthLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/new-vehicle" element={<NewVehicle />} />
				<Route path="/new-car-owner" element={<NewCarOwner />} />
				<Route path="/vehicle-owners" element={<CarOwners />} />
				<Route path="/assign/:vehicle" element={<Assign />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthLayout>
	);
}

export default App;
