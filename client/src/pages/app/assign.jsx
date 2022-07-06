import { get, put } from "../../utils/axios";
import { getToken } from "../../utils/token";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../componets/button";
import { NotificationManager } from "react-notifications";
import { popperGenerator } from "@popperjs/core";
import { useNavigate, useParams } from "react-router-dom";

export function Assign() {
	const [carOwners, setCarOwners] = useState([]);

	const [ownerId, setOwnerId] = useState(null);

	const { vehicle } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		(async function () {
			let total = 0;
			let { data } = await get("/api/car-owners?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			total = data.totalElements;

			let { data: data1 } = await get("/api/car-owners?limit=" + total, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setCarOwners(data1.content);
		})();
	}, []);

	const link = async () => {
		try {
			if (ownerId == null) {
				NotificationManager.error("Please select an owner", "Error");
				return;
			}

			let { data } = await put(
				"/api/vehicles/" + vehicle + "/link/" + ownerId,
				null,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			console.log(data);

			navigate("/dashboard");
		} catch (error) {
			NotificationManager.error("An Error Occured", "Error");
		}
	};

	return (
		<div className="container">
			<h1>Assign the selected vehicle to the Car Owner</h1>
			<div className="mt-5">
				<h2>Select the car owner</h2>
				<select
					className="form-select"
					aria-label="Default select example"
					onChange={(id) => {
						setOwnerId(id.target.value);
					}}
				>
					<option selected disabled>
						Open this select menu
					</option>
					{carOwners.map((carOwner, index) => (
						<option value="1" key={index}>
							{carOwner.fullNames} {carOwner.nationalId}
						</option>
					))}
				</select>

				<div className="mt-5">
					<Button title="Link" onClick={link} />
				</div>
			</div>
		</div>
	);
}
