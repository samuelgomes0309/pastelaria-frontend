import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function New() {
	const isAllowed = await requireAuth({
		needRole: "ADMIN",
	});
	if (!isAllowed) {
		return redirect("/dashboard/categories");
	}
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Novas categorias</h1>
		</div>
	);
}
