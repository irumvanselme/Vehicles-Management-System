import Report from "../../componets/report";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";
import { get } from "../../utils/axios";
import { Link } from "react-router-dom";

export function CarOwners() {
	const [owners, setOwners] = useState([1, 2, 3, 4, 5]);
	const [activePage, setActivePage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		(async function () {
			let { data } = await get(
				"/api/car-owners?limit=5&page=" + activePage,
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);

			setTotalPages(data.totalPages);
			setOwners(data.content);
		})();
	}, []);

	const reload = (page) => async () => {
		let { data } = await get("/api/car-owners?limit=5&page=" + page, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
			},
		});

		setActivePage(page);
		setTotalPages(data.totalPages);
		setOwners(data.content);
	};

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
					<h2 className="t-primary">Car Owners</h2>
					<div className="mt-4">
						<div className="b-primary text-white px-4 py-3 row row-cols-4 justify-content-between fw-bold shadow-sm">
							<div>Full name </div>
							<div>National Id</div>
							<div>Phone number</div>
							<div>address</div>
						</div>

						{owners.map((owner, key) => {
							return (
								<div
									key={key}
									className="text-black px-4 py-3 row row-cols-4 justify-content-between mt-3"
									style={{
										backgroundColor: "#FAFAFA",
									}}
								>
									<div>{owner.fullNames}</div>
									<div>{owner.nationalId}</div>
									<div>{owner.phoneNumber} FRW</div>
									<div>{owner.address}</div>
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
