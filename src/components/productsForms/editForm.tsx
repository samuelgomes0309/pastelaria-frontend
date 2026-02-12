"use client";

import { Product } from "@/@types/products";
import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
	UpdateProductInput,
	UpdateProductOutput,
	updateProductSchema,
} from "@/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { updateProductAction } from "@/actions/product/updateProductAction";
import { toast } from "sonner";

interface ProductEditProps {
	product: Product;
}

export function ProductEditForm({ product }: ProductEditProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [errorMsg, setErrorMsg] = useState<null | string>(null);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<UpdateProductInput, any, UpdateProductOutput>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			description: product.description ?? "",
			name: product.name ?? "",
			price: (product.price / 100).toString() ?? "",
		},
	});
	useEffect(() => {
		if (product?.bannerUrl) {
			setImagePreview(product.bannerUrl);
		}
	}, [product]);
	async function onSubmit(data: UpdateProductOutput) {
		setErrorMsg(null);
		const response = await updateProductAction({
			data,
			product,
		});
		if (response.success) {
			// Registro bem-sucedido - redirecionar para a página de produtos
			toast.success("Produto atualizado com sucesso.", {
				onAutoClose: () => {
					router.push("/dashboard/products");
				},
			});
		} else {
			const apiError = response.errors;
			if ("_form" in apiError && apiError._form) {
				toast.error(apiError._form[0]);
				setErrorMsg(apiError._form[0]);
			}
		}
	}
	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file || !file.type.startsWith("image/")) {
			setError("image", {
				message: "Por favor, selecione um arquivo de imagem válido",
			});
			return;
		}
		if (file) {
			// Gerar um preview da imagem usando URL.createObjectURL
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
			// Registrar o arquivo no react-hook-form para validação e submissão
			setValue("image", file, { shouldValidate: true });
		}
	}
	return (
		<Card className="bg-app-surface-deep border-app-surface-elevated mt-6 w-full border shadow-2xl">
			<CardContent>
				<form
					className="flex w-full flex-col gap-2.5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex w-full flex-col gap-4 sm:flex-row">
						<div className="flex flex-1 flex-col space-y-3">
							<Label className="text-white">Nome do Produto</Label>
							<Input
								type="text"
								placeholder="Ex: Pastel de carne"
								className="bg-app-background border-none text-white shadow-2xl"
								{...register("name")}
							/>
							{errors.name && (
								<p className="text-sm text-red-500">{errors.name.message}</p>
							)}
						</div>
						<div className="flex flex-1 flex-col space-y-3">
							<Label className="text-white">Preço</Label>
							<Input
								type="text"
								placeholder="Ex: 9.99"
								className="bg-app-background border-none text-white shadow-2xl"
								{...register("price")}
							/>
							{errors.price && (
								<p className="text-sm text-red-500">{errors.price.message}</p>
							)}
						</div>
					</div>
					<div className="flex w-full gap-2.5">
						<div className="flex flex-1 flex-col space-y-3">
							<Label className="text-white">Categoria</Label>
							<Input
								className="bg-app-background cursor-not-allowed border-none text-white shadow-2xl"
								value={product?.category?.name}
								disabled
							/>
							<div className="bg-app-background w-full cursor-pointer border-none text-white shadow-2xl"></div>
						</div>
						<div className="hidden flex-1 sm:block"></div>
					</div>
					<div className="flex flex-col space-y-3">
						<Label className="text-white">Descrição</Label>
						<Textarea
							className="bg-app-background max-h-40 border-none text-white shadow-2xl"
							placeholder="Descrição do produto"
							{...register("description")}
						></Textarea>
						{errors.description && (
							<p className="text-sm text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>
					<div className="flex flex-col space-y-3">
						<Label className="text-white">Imagem</Label>
						<div
							className={`bg-app-background hover:border-brand-primary-hover relative flex min-h-20 flex-col items-center justify-center rounded-md border border-transparent text-white shadow-2xl transition duration-500 ${imagePreview ? "pt-4" : ""}`}
						>
							<Input
								type="file"
								className="absolute z-10 h-full w-full cursor-pointer rounded-md border-none opacity-0"
								accept="image/*"
								// Registrar o campo de imagem no react-hook-form e lidar com a mudança para mostrar o preview
								onChange={(e) => handleImageChange(e)}
							/>
							<Upload
								className={`h-5 w-5 ${imagePreview ? "text-green-500" : "text-white"}`}
							/>
							<p>Clique para enviar uma imagem</p>
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Preview da imagem"
									className="mt-3 max-h-40 w-full rounded-md object-cover"
								/>
							)}
						</div>
						{errors.image && (
							<p className="text-sm text-red-500">{errors.image.message}</p>
						)}
					</div>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="bg-brand-primary hover:bg-brand-primary-hover mt-2 cursor-pointer transition-all duration-500"
					>
						{isSubmitting ? "Atualizando..." : "Atualizar"}
					</Button>
					{errorMsg && (
						<p className="mt-5 text-center text-sm text-red-500 transition">
							{errorMsg}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
