import Report from "../../componets/report";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";
import { get } from "../../utils/axios";
import { Link } from "react-router-dom";

export function Dashboard() {
	const [vehicles, setVehicles] = useState([]);
	const [activePage, setActivePage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		(async function () {
			let { data } = await get(
				"/api/vehicles?limit=5&page=" + activePage,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			setTotalPages(data.totalPages);
			setVehicles(data.content);
		})();
	}, []);

	const reload = (page) => async () => {
		let { data } = await get("/api/vehicles?limit=5&page=" + page, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		setActivePage(page);
		setTotalPages(data.totalPages);
		setVehicles(data.content);
	};

	const assign = () => {};

	return (
		<>
			<div className="container">
				<Report />
				<div
					className="bg-white card px-5 py-4 overflow-auto"
					style={{
						marginTop: 30,
						borderRadius: 10,
					}}
				>
					<h2 className="t-primary">Vehicles</h2>
					<div
						className="mt-4"
						style={{
							minWidth: 700,
						}}
					>
						<div className="b-primary text-white px-4 py-3 row row-cols-6 justify-content-between fw-bold shadow-sm">
							<div>Plate number </div>
							<div>Company / Year</div>
							<div>Price</div>
							<div>Chassis Number</div>
							<div>Model name</div>
							<div>Owner</div>
						</div>

						{vehicles.map((vehicle, key) => {
							return (
								<div
									key={key}
									className="text-black px-4 py-3 row row-cols-6 justify-content-between mt-3"
									style={{
										backgroundColor: "#FAFAFA",
									}}
								>
									<div>{vehicle.plateNumber}</div>
									<div>
										{vehicle.manufuctureCompany} /{" "}
										{vehicle.manufucturedYear}
									</div>
									<div>{vehicle.price} FRW</div>
									<div>{vehicle.chassisNumber}</div>
									<div>{vehicle.modelName}</div>
									<div>
										{vehicle.owner == null ? (
											<>
												<div className="text-danger">
													N/A
												</div>

												<div>
													<Link
														style={{
															fontSize: 13,
														}}
														to={
															"/assign/" +
															vehicle.id
														}
													>
														Assign
													</Link>
												</div>
											</>
										) : (
											<>
												<div>
													{vehicle.owner.fullNames}
												</div>

												<div>
													<Link
														style={{
															fontSize: 13,
														}}
														to={
															"/assign/" +
															vehicle.id
														}
													>
														Change
													</Link>
												</div>
											</>
										)}
									</div>
								</div>
							);
						})}

						<div className="mt-5 d-flex justify-content-between">
							<div>Page {activePage + 1}</div>
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li
										className={
											"page-item " +
											(activePage == 0 && "disabled")
										}
										onClick={reload(activePage - 1)}
									>
										<a className="page-link" href="#">
											<span aria-hidden="true">
												&laquo;
											</span>
										</a>
									</li>
									{Array.from(Array(totalPages).keys()).map(
										(page) => {
											return (
												<li
													className={
														"page-item " +
														(page == activePage
															? "active"
															: "")
													}
													key={page}
													onClick={reload(page)}
												>
													<a
														className="page-link"
														href="#"
													>
														{page + 1}
													</a>
												</li>
											);
										}
									)}
									<li
										className={
											"page-item " +
											(activePage == totalPages - 1 &&
												"disabled")
										}
										onClick={reload(activePage + 1)}
									>
										<a className="page-link" href="#">
											<span aria-hidden="true">
												&raquo;
											</span>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
