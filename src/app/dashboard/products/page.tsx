import { Product } from "@/@types/products";
import { listProductsAction } from "@/actions/product/listProductsAction";
import Header from "@/components/dashboard/header/header";
import ProductTable from "@/components/productsTable/productTable";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Products() {
	const products: Product[] = await listProductsAction();
	const user = await isAuthenticated();
	if (!user) {
		return redirect("/login");
	}
	if (products.length === 0) {
		return;
	}
	return (
		<div>
			<Header
				title="Produtos"
				description="Gerencie o cardápio de produtos"
				href="/dashboard/products/new"
				textLink="Cadastrar novo produto"
			/>
			<ProductTable products={products} user={user} />
		</div>
	);
}
