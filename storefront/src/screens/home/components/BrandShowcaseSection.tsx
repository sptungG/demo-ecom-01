import React from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { Star, Award } from "lucide-react";

export const BrandShowcaseSection = () => {
	const brands = [
		{
			id: 1,
			name: "Nike",
			logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
			description: "Just Do It",
			rating: 4.8,
			products: 1200,
		},
		{
			id: 2,
			name: "Adidas",
			logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop",
			description: "Impossible Is Nothing",
			rating: 4.7,
			products: 980,
		},
		{
			id: 3,
			name: "Zara",
			logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
			description: "Fashion Forward",
			rating: 4.6,
			products: 850,
		},
		{
			id: 4,
			name: "H&M",
			logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
			description: "Fashion & Quality",
			rating: 4.5,
			products: 1100,
		},
		{
			id: 5,
			name: "Uniqlo",
			logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
			description: "LifeWear",
			rating: 4.7,
			products: 750,
		},
		{
			id: 6,
			name: "Puma",
			logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
			description: "Forever Faster",
			rating: 4.4,
			products: 650,
		},
	];

	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<div className="mb-4 flex items-center justify-center gap-2">
						<Award className="h-6 w-6 text-amber-600" />
					</div>
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Featured Brands</h2>
					<p className="mt-4 text-lg text-neutral-600">
						{`${"Shop from the world's most trusted and popular fashion brands"}`}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{brands.map((brand) => (
						<div
							key={brand.id}
							className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<div className="h-16 w-16 overflow-hidden rounded-lg">
										<img src={brand.logo} alt={brand.name} className="h-full w-full object-cover" />
									</div>
								</div>
								<div className="min-w-0 flex-1">
									<h3 className="text-lg font-semibold text-neutral-900 transition-colors group-hover:text-blue-600">
										{brand.name}
									</h3>
									<p className="text-sm text-neutral-600">{brand.description}</p>
									<div className="mt-2 flex items-center">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`h-4 w-4 ${
														i < Math.floor(brand.rating) ? "fill-current text-yellow-400" : "text-gray-300"
													}`}
												/>
											))}
										</div>
										<span className="ml-2 text-sm text-neutral-600">{brand.rating}</span>
									</div>
									<p className="mt-1 text-xs text-neutral-500">{brand.products.toLocaleString()} products</p>
								</div>
							</div>

							<div className="mt-4 border-t border-gray-200 pt-4">
								<LinkWithChannel
									href={`/search?brand=${brand.name.toLowerCase()}`}
									className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
								>
									Shop {brand.name} →
								</LinkWithChannel>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<LinkWithChannel
						href="/brands"
						className="inline-flex items-center rounded-md border-2 border-neutral-900 bg-transparent px-8 py-3 text-base font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
					>
						View All Brands
						<Award className="ml-2 h-4 w-4" />
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
};
