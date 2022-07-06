import Report from "../../componets/report";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";
import { get } from "../../utils/axios";
import { Link } from "react-router-dom";

export function Dashboard() {
	const [vehicles, setVehicles] = useState([1, 2, 3, 4, 5]);
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
					className="bg-white p-5"
					style={{
						marginTop: 50,
						borderRadius: 10,
					}}
				>
					<h2 className="t-primary">Vehicles</h2>
					<div className="mt-4">
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
										<Link to={"/assign/" + vehicle.id}>
											<button
												className="btn btn-info text-white"
												onClick={assign}
											>
												Assign
											</button>
										</Link>
									</div>
								</div>
							);
						})}

						<div className="mt-5 d-flex justify-content-between">
							<div>Page {activePage + 1}</div>
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li className="page-item">
										<a className="page-link" href="#">
											Previous
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
									<li className="page-item">
										<a className="page-link" href="#">
											Next
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
