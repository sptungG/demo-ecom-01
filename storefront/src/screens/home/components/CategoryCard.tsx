import React from "react";
import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

interface Category {
	id: string;
	name: string;
	slug: string;
	image: string;
	productCount: number;
}

interface CategoryCardProps {
	category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<LinkWithChannel
			href={`/categories/${category.slug}`}
			className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
		>
			<div className="aspect-[4/3] w-full overflow-hidden">
				<Image
					src={category.image}
					alt={category.name}
					width={400}
					height={300}
					className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="p-6">
				<h3 className="text-lg font-semibold text-neutral-900">{category.name}</h3>
				<p className="mt-1 text-sm text-neutral-500">{category.productCount} products</p>
			</div>
		</LinkWithChannel>
	);
};