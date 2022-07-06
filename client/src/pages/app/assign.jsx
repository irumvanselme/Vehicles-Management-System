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

	const [vehicleDetails, setVehicle] = useState({});

	const { vehicle } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		(async function () {
			let { data: the_vehicle } = await get("/api/vehicles/" + vehicle, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			setVehicle(the_vehicle);

			let total = 0;
			let { data } = await get("/api/vehicle-owners?limit=1", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			total = data.totalElements;

			let { data: data1 } = await get(
				"/api/vehicle-owners?limit=" + total,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

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
			<div className="my-5 card bg-white">
				<div className="card-header">The Vehicle Info</div>
				<div className="card-body p-4">
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Chassis Number
						</span>
						: {vehicleDetails.chassisNumber}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Manufucturing company
						</span>
						: {vehicleDetails.manufuctureCompany}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Manufuctured Year
						</span>
						: {vehicleDetails.manufucturedYear}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Model Name
						</span>
						: {vehicleDetails.modelName}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Plate number
						</span>
						: {vehicleDetails.plateNumber}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Price
						</span>
						: {vehicleDetails.price}
					</div>
					<div className="mt-2">
						<span
							className="d-inline-block fw-bold"
							style={{ width: 250 }}
						>
							Registered date
						</span>
						: {vehicleDetails.registeredDate}
					</div>
					{vehicleDetails.owner != null && (
						<>
							<hr />
							<div className="mt-2">
								<span
									className="d-inline-block fw-bold"
									style={{ width: 250 }}
								>
									Old owners name
								</span>
								: {vehicleDetails.owner.fullNames}
							</div>
							<div className="mt-2">
								<span
									className="d-inline-block fw-bold"
									style={{ width: 250 }}
								>
									Old owners phone
								</span>
								: {vehicleDetails.owner.phoneNumber}
							</div>

							<div className="mt-2">
								<span
									className="d-inline-block fw-bold"
									style={{ width: 250 }}
								>
									Old owners ID Card number
								</span>
								: {vehicleDetails.owner.nationalId}
							</div>
						</>
					)}
				</div>
			</div>
			<div className="mt-5">
				<h5>Select the car owner</h5>
				<select
					className="form-select"
					aria-label="Default select example"
					onChange={(id) => {
						setOwnerId(id.target.value);
					}}
				>
					<option defaultValue value={null}>
						Open this select menu
					</option>
					{carOwners.map((carOwner, index) => (
						<option value={carOwner.id} key={index}>
							{carOwner.fullNames} {carOwner.nationalId}
						</option>
					))}
				</select>

				<div className="mt-5">
					<Button
						title="Link"
						onClick={link}
						style={{
							maxWidth: 300,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
