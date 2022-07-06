export default function Button({ title = "SAVE", ...props }) {
	return (
		<div>
			<button
				className="btn btn-primary w-100 mt-5"
				type="submit"
				{...props}
			>
				{title}
			</button>
		</div>
	);
}
