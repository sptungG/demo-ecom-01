import React from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { ProductElement } from "@/ui/components/ProductElement";
import type { ProductListItemFragment } from "@/gql/graphql";

interface FeaturedProductsSectionProps {
	products: ProductListItemFragment[];
}

export const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
    console.log(products)
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="text-center">
				<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
					Featured Products
				</h2>
				<p className="mt-4 text-lg text-neutral-600">
					Discover our handpicked selection of premium products
				</p>
			</div>

			<ul
				role="list"
				className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			>
				{products.map((product, index) => (
					<ProductElement
						key={product.id}
						product={product}
						priority={index < 2}
						loading={index < 3 ? "eager" : "lazy"}
					/>
				))}
			</ul>

			<div className="mt-12 text-center">
				<LinkWithChannel
					href="/products"
					className="inline-flex items-center rounded-md border border-transparent bg-neutral-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
				>
					View All Products
				</LinkWithChannel>
			</div>
		</section>
	);
};