"use client";

import { Product } from "@/@types/products";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

export function ProductItem({
	product,
	onOpenDetails,
}: {
	product: Product;
	onOpenDetails: (product: Product) => void;
}) {
	const price = (product.price / 100).toFixed(2); // Converte o preço de centavos para reais
	return (
		<TableRow key={product.id}>
			<TableCell>
				<img
					src={product.bannerUrl}
					alt={product.name}
					className="h-12 w-12 rounded-md object-cover"
				/>
			</TableCell>
			<TableCell className="text-center">{product.name}</TableCell>
			<TableCell className="text-brand-primary text-center">
				R$ {price}
			</TableCell>
			<TableCell>
				<p className="bg-app-background rounded-full py-0.5 text-center">
					{product.category.name}
				</p>
			</TableCell>
			<TableCell className="max-w-44 truncate text-center">
				{product.description}
			</TableCell>
			<TableCell className="flex items-center justify-center">
				<Button
					className="bg-app-black hover:bg-app-background flex cursor-pointer items-center rounded-md p-2 transition-all duration-500"
					type="button"
					onClick={() => onOpenDetails(product)}
				>
					Detalhar
				</Button>
			</TableCell>
		</TableRow>
	);
}
