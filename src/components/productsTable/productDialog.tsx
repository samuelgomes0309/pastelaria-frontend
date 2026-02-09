"use client";

import { Product } from "@/@types/products";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import { Switch } from "../ui/switch";
import { updateStatusAction } from "@/actions/product/updateStatusAction";
import { useRouter } from "next/navigation";

interface DialogProductDetailsProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	product: Product;
	role: "ADMIN" | "STAFF";
}

export function DialogProductDetails({
	visible,
	setVisible,
	product,
	role,
}: DialogProductDetailsProps) {
	const router = useRouter();
	const [isActive, setIsActive] = useState(!product.disabled);
	useEffect(() => {
		if (visible) {
			setIsActive(!product.disabled);
		}
	}, [product.disabled, visible]);
	const price = (product.price / 100).toFixed(2);
	async function handleSave() {
		if (!product?.id) {
			return;
		}
		const response = await updateStatusAction({
			status: !isActive,
			product_id: product.id,
		});
		if (response.success) {
			//No momento vamos forçar atualizar, tenho melhoria em mente...
			router.refresh();
			setVisible(false);
		}
	}
	return (
		<Dialog open={visible} onOpenChange={(open) => setVisible(open)}>
			<DialogContent
				showCloseButton={false}
				className="bg-app-surface-deep border-app-surface-elevated w-full border text-white shadow-2xl"
			>
				<DialogHeader className="flex w-full flex-row items-center justify-between gap-2">
					<DialogTitle className="flex h-full w-full max-w-4/5 items-center justify-start gap-2">
						{product.name}
						{role === "ADMIN" && (
							<Switch
								className={
									"cursor-pointer data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-red-700"
								}
								id="disable-switch"
								checked={isActive}
								onCheckedChange={setIsActive}
							/>
						)}
					</DialogTitle>
					<DialogClose className="cursor-pointer transition duration-500 hover:scale-105">
						<X />
					</DialogClose>
				</DialogHeader>
				<DialogDescription>{product.description}</DialogDescription>
				<div>
					<img
						src={product.bannerUrl}
						alt={product.name}
						className="my-4 h-24 w-full rounded-md object-cover"
					/>
					<p className="text-brand-primary">
						Preço: <span className="ml-2 text-white"> R$ {price}</span>
					</p>
					<p className="text-brand-primary">
						Categoria:
						<span className="ml-2 text-white"> {product.category.name}</span>
					</p>
				</div>
				<DialogFooter>
					{!product.disabled !== isActive && (
						<Button
							type="button"
							className="bg-app-surface hover:bg-app-background mt-2 cursor-pointer transition-all duration-500"
							onClick={handleSave}
						>
							Salvar
						</Button>
					)}
					{role === "ADMIN" && (
						<Button
							type="button"
							className="bg-brand-primary hover:bg-brand-primary-hover mt-2 cursor-pointer transition-all duration-500"
						>
							<Trash className="mr-2 h-4 w-4" />
							Excluir
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
