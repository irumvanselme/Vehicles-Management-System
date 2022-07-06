import { Link, useNavigate } from "react-router-dom";
import Button from "../../componets/button";
import FormControl from "../../componets/form-control";
import { post } from "../../utils/axios";
import { submithandler } from "../../utils/submithandler";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import { validate } from "../../utils/validator";
import { setToken } from "../../utils/token";
import AuthLayout from "../../layouts/auth-layout";

export default function Register() {
	let navigate = useNavigate();

	const [errors, setErrors] = useState({});

	async function register(data) {
		try {
			let [passes, errors] = validate(data, {
				fullNames: "required:min:3",
				email: "required|email",
				nationalId: "required|string|min:16|max:16",
				phoneNumber: "required|string|min:10|max:15",
				password: "required",
			});

			if (!passes) {
				setErrors(errors);
				return;
			}

			setErrors({});

			let res = await post("/api/auth/register", data);
			console.log(res);

			let { data: token } = await post("/api/auth/signin", {
				login: data.email,
				password: data.password,
			});

			setToken(token.message);

			NotificationManager.success("Registered Successfully");

			window.location.href = "/dashboard";
		} catch (e) {
			if (e.response.status === 400) {
				NotificationManager.error(e.response.data.message);
			} else if (e.response.status === 404) {
				NotificationManager.error("Failed to register");
			}
		}
	}

	return (
		<div className="container d-flex flex-column vh-100 align-items-center">
			<h2 className="t-primary fw-bold mt-5">Hello. Have an account</h2>
			<div className={"mt-5 w-100"} style={{ maxWidth: 500 }}>
				<form onSubmit={submithandler(register)} autoComplete={"false"}>
					<FormControl
						errors={errors.fullNames}
						label="Full Names"
						name={"fullNames"}
					/>
					<FormControl
						errors={errors.email}
						label="Email"
						name={"email"}
					/>
					<FormControl
						errors={errors.phoneNumber}
						label="Phone number"
						name={"phoneNumber"}
					/>

					<FormControl
						errors={errors.nationalId}
						label="National ID"
						name={"nationalId"}
					/>
					<FormControl
						errors={errors.password}
						label="Password"
						type="password"
						name={"password"}
					/>
					<Button />
				</form>
			</div>
			<div className="mt-4">
				<Link to="/auth/login">
					<span className="t-primary">
						Already have an account ? Login
					</span>
				</Link>
			</div>
		</div>
	);
}
