import { get } from "../utils/axios";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../utils/token";
import { Link } from "react-router-dom";

function Card({ bg, title, count, link1, link2 }) {
	return (
		<div className={bg + " mx-4 px-4 py-3 rounded shadow-lg"}>
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
	);
}

export default function Report() {
	const [vehicles, setVehicles] = useState(0);
	const [carOwners, setCarOwners] = useState(0);

	useEffect(() => {
		(async function () {
			let { data } = await get("/api/vehicles?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setVehicles(data.totalElements);

			let { data: data1 } = await get("/api/car-owners?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setCarOwners(data1.totalElements);
		})();
	}, []);

	return (
		<div>
			<div className="row row-cols-3">
				<Card
					bg={"bg-warning"}
					title="Vehicles"
					count={vehicles}
					link1="/dashboard"
					link2="/new-vehicle"
				/>
				<Card
					bg={"bg-danger text-white"}
					title="Car owners"
					count={carOwners}
					link1="/car-owners"
					link2="/new-car-owner"
				/>
			</div>
		</div>
	);
}
