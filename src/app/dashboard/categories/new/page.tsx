import { requireAuth } from "@/lib/auth";

export default async function New() {
	await requireAuth({
		needRole: "ADMIN",
		redirectTo: "/dashboard/categories",
	});
	return (
		<div className=" ">
			<h1 className="text-2xl font-bold">Novas categorias</h1>
		</div>
	);
}
