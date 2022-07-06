import { get } from "../utils/axios";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../utils/token";
import { Link } from "react-router-dom";

function Vehicled({ bg, title, count, link1, link2 }) {
	return (
		<div className="px-2">
			<div className={bg + " px-4 py-3 rounded shadow-lg mt-4 mt-lg-0"}>
				<h4>
					{title} [{count}]
				</h4>
				<div className="mt-4">
					<Link to={link1}>
						<button className="btn btn-sm btn-primary rounded px-3">
							View All
						</button>
					</Link>
					<Link to={link2}>
						<button className="btn btn-sm btn-primary rounded px-4 mx-4">
							New
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Report() {
	const [vehicles, setVehicles] = useState(0);
	const [vehicleOwners, setVehicleOwners] = useState(0);

	useEffect(() => {
		(async function () {
			let { data } = await get("/api/vehicles?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setVehicles(data.totalElements);

			let { data: data1 } = await get("/api/vehicle-owners?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setVehicleOwners(data1.totalElements);
		})();
	}, []);

	return (
		<div>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-0 mx-0">
				<Vehicled
					bg={"bg-warning"}
					title="Vehicles"
					count={vehicles}
					link1="/dashboard"
					link2="/new-vehicle"
				/>
				<Vehicled
					bg={"bg-danger text-white"}
					title="Vehicle owners"
					count={vehicleOwners}
					link1="/vehicle-owners"
					link2="/new-vehicle-owner"
				/>
			</div>
		</div>
	);
}
