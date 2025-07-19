import React from "react";
import { CategoryCard } from "./CategoryCard";

interface Category {
	id: string;
	name: string;
	slug: string;
	parent?: {
		id: string;
		name: string;
	};
	level: number;
	updatedAt: string;
	children?: {
		totalCount: number;
	};
	description?: string;
	backgroundImage?: {
		url: string;
		alt?: string;
	};
	products?: {
		totalCount: number;
	};
}

interface CategoriesSectionProps {
	categories: Category[];
}

export const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
	return (
		<section className="bg-neutral-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Shop by Category</h2>
					<p className="mt-4 text-lg text-neutral-600">Find exactly what you're looking for</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</div>
			</div>
		</section>
	);
};
