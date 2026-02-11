import { listOptionalsAction } from "@/actions/optionals/listOptionalsAction";
import Header from "@/components/dashboard/header/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Optionals() {
	const optionals = await listOptionalsAction();
	const hasOptionals = optionals.length > 0;
	return (
		<div>
			<Header
				title="Opcionais"
				description="Gerencie os produtos opcionais"
				href="/dashboard/optionals/new"
				textLink="Cadastrar novo opcional"
			/>
			{hasOptionals ? (
				<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
					{optionals.map((optional) => (
						<Card
							key={optional.id}
							className="bg-app-surface-deep border-app-surface-elevated w-full border text-white shadow-2xl"
						>
							<CardHeader>
								<CardTitle>{optional.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-text-disabled text-sm">id: {optional.id}</p>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="mt-10 text-center font-bold">
					<p>Nenhum opcional encontrado....</p>
				</div>
			)}
		</div>
	);
}
