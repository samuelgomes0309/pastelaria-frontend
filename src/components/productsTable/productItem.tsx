"use client";

import { Product } from "@/@types/products";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";

export function ProductItem({
	product,
	onOpenDetails,
}: {
	product: Product;
	onOpenDetails: (product: Product) => void;
}) {
	const price = (product.price / 100).toFixed(2); // Converte o preço de centavos para reais
	const status = product.disabled === false ? "Ativo" : "Inativo";
	return (
		<Card className="bg-app-surface-deep w-full rounded-md border-none p-0 text-white shadow-2xl shadow-black/50 transition duration-500 hover:translate-y-0.5">
			<CardContent className="p-0">
				<div className="relative h-64 w-full">
					<Image
						src={product.bannerUrl}
						alt={`Preview ${product.name}`}
						fill
						className="rounded-t-md object-cover"
					/>
				</div>
				<div className="flex flex-col gap-2 px-2 py-3">
					<div className="flex items-center justify-between">
						<h1 className="truncate text-xl font-bold italic md:text-2xl">
							{product.name}
						</h1>
						<div className="flex flex-col items-end justify-center gap-2">
							<span
								className={`${status === "Ativo" ? "bg-green-700" : "bg-red-700"} rounded-md px-2 text-white`}
							>
								{status}
							</span>
							<p className="bg-app-background w-fit rounded-md px-4 py-1 text-gray-400">
								{product.category.name}
							</p>
						</div>
					</div>
					<p className="text-text-muted truncate text-sm">
						{product.description}
					</p>
					<p className="text-center text-xl font-bold md:text-2xl">
						R$ {price}
					</p>
				</div>
			</CardContent>
			<CardFooter className="p-0 px-2">
				<Button
					className="bg-brand-primary hover:bg-brand-primary-hover mb-5 flex w-full cursor-pointer items-center rounded-md transition-all duration-500"
					type="button"
					onClick={() => onOpenDetails(product)}
				>
					Detalhar
				</Button>
			</CardFooter>
		</Card>
	);
}
