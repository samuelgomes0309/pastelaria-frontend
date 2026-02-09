"use client";

import { Product } from "@/@types/products";
import { Card, CardContent } from "../ui/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { ProductItem } from "./productItem";
import { DialogProductDetails } from "./productDialog";
import { useState } from "react";
import { User } from "@/@types/user";

interface ProductTableProps {
	products: Product[];
	user: User;
}

export default function ProductTable({ products, user }: ProductTableProps) {
	const [visible, setVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	function handleOpenDialog(product: Product) {
		setSelectedProduct(product);
		setVisible(true);
	}
	return (
		<Card className="bg-app-surface-deep border-app-surface-elevated mt-6 w-full border text-white shadow-2xl">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center text-white"> Imagem </TableHead>
							<TableHead className="text-center text-white"> Nome </TableHead>
							<TableHead className="text-center text-white"> Preço </TableHead>
							<TableHead className="text-center text-white">
								Categoria
							</TableHead>
							<TableHead className="text-center text-white">
								Descrição
							</TableHead>
							<TableHead className="text-center text-white">Detalhes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<ProductItem
								key={product.id}
								product={product}
								onOpenDetails={handleOpenDialog}
							/>
						))}
					</TableBody>
				</Table>
			</CardContent>
			{/* CORREÇÃO: Renderização condicional para evitar passar null e prevenir erro de hidratação React */}
			{selectedProduct && (
				<DialogProductDetails
					visible={visible}
					setVisible={setVisible}
					product={selectedProduct}
					role={user.role}
				/>
			)}
		</Card>
	);
}
