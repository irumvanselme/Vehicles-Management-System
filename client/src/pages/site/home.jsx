import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogPost from "../../componets/blog-post";
import AuthLayout from "../../layouts/auth-layout";
import { get } from "../../utils/axios";
import { getToken } from "../../utils/token";

export default function Home() {
	return (
		<>
			<div className="container mt-5">
				<h1>Welcome to vehicle tracking management system for RRA</h1>

				{!(getToken().length >= 10) ? (
					<div className="d-flex mt-5">
						<div className="mr-1 px-2">
							<Link className="btn btn-primary" to="/auth/login">
								Login
							</Link>
						</div>
						<div className="px-2">
							<Link
								className="btn btn-outline-primary"
								to="/auth/register"
							>
								Register
							</Link>
						</div>
					</div>
				) : (
					<div className="px-2 mt-5">
						<Link
							className="btn btn-outline-primary"
							to="/dashboard"
						>
							Dashboard
						</Link>
					</div>
				)}
			</div>
		</>
	);
}
