"use server";

import { Category } from "@/@types/categories";
import { setupApi } from "@/lib/api";

export async function listCategoriesAction() {
	// Lógica para listar categorias pode ser implementada aqui
	const api = await setupApi();
	try {
		const response = await api.get<Category[]>("/categories");
		return response.data;
	} catch (error) {
		console.error("Erro ao listar categorias:", error);
		return [];
	}
}
