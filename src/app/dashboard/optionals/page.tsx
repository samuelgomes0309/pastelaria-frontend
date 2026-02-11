import Header from "@/components/dashboard/header/header";

export default function Optionals() {
	return (
		<div>
			<Header
				title="Opcionais"
				description="Gerencie os produtos opcionais"
				href="/dashboard/optionals/new"
				textLink="Cadastrar novo opcional"
			/>
		</div>
	);
}
