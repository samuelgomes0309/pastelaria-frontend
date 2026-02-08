import Header from "@/components/dashboard/header/header";

export default function Products() {
	return (
		<div>
			<Header
				title="Produtos"
				description="Gerencie o cardápio de produtos"
				href="/dashboard/products/new"
				textLink="Cadastrar novo produto"
			/>
		</div>
	);
}
