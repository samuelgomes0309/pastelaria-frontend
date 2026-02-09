import { Product } from "@/@types/products";
import { setupApi } from "@/lib/api";

export async function listProductsAction() {
	const api = await setupApi();
	try {
		const response = await api.get<Product[]>("/products/all", {
			params: {
				status: false, // Filtra apenas os produtos ativos
			},
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao listar produtos:", error);
		return [];
	}
}
