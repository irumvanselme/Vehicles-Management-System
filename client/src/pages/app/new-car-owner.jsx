import Button from "../../componets/button";
import FormControl from "../../componets/form-control";
import { useState } from "react";
import { submithandler } from "../../utils/submithandler";
import { validate } from "../../utils/validator";
import { getToken } from "../../utils/token";
import { post } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

export function NewCarOwner() {
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	async function createCarOwner(data) {
		try {
			let [passes, errors] = validate(data, {
				fullNames: "required:min:3",
				address: "required|string",
				nationalId: "required|string|min:16|max:16",
				phoneNumber: "required|string|min:10|max:15",
			});

			if (!passes) {
				setErrors(errors);
				return;
			}

			setErrors({});

			await post("/api/vehicle-owners", data, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			NotificationManager.success("Created a Car Owner", "Success");

			navigate("/vehicle-owners");
		} catch (error) {}
	}

	return (
		<div className="container">
			<h1 className="t-primary">Create a New Car owner</h1>
			<form onSubmit={submithandler(createCarOwner)}>
				<div style={{ maxWidth: 500 }} className="mt-5 mb-5">
					<FormControl
						name="fullNames"
						errors={errors.fullNames}
						placeholder="Enter the full names"
						label="Full Names"
					/>
					<FormControl
						name="nationalId"
						errors={errors.nationalId}
						placeholder="Enter the national id"
						label="National ID"
					/>
					<FormControl
						name="phoneNumber"
						errors={errors.phoneNumber}
						placeholder="Enter the phone number"
						label="Phone Number"
					/>
					<FormControl
						name="address"
						errors={errors.address}
						placeholder="Enter the address"
						label="Address"
					/>

					<Button title="Create" />
				</div>
			</form>
		</div>
	);
}
