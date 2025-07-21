import React from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { Sun, Snowflake, Leaf, Flower } from "lucide-react";

export const SeasonalCollectionSection = () => {
	const seasonalCollections = [
		{
			id: 1,
			name: "Summer Collection",
			description: "Light, breathable fabrics perfect for warm weather",
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop",
			icon: Sun,
			color: "from-yellow-400 to-orange-500",
			bgColor: "from-yellow-50 to-orange-50",
			items: 150,
			discount: "Up to 40% off",
		},
		{
			id: 2,
			name: "Winter Essentials",
			description: "Cozy and warm clothing for the cold season",
			image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=400&fit=crop",
			icon: Snowflake,
			color: "from-blue-400 to-indigo-500",
			bgColor: "from-blue-50 to-indigo-50",
			items: 120,
			discount: "Up to 35% off",
		},
		{
			id: 3,
			name: "Autumn Styles",
			description: "Rich colors and comfortable layers for fall",
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
			icon: Leaf,
			color: "from-amber-500 to-red-500",
			bgColor: "from-amber-50 to-red-50",
			items: 180,
			discount: "Up to 30% off",
		},
		{
			id: 4,
			name: "Spring Fashion",
			description: "Fresh and vibrant styles for the new season",
			image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
			icon: Flower,
			color: "from-pink-400 to-purple-500",
			bgColor: "from-pink-50 to-purple-50",
			items: 200,
			discount: "Up to 25% off",
		},
	];

	return (
		<section className="py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
						Seasonal Collections
					</h2>
					<p className="mt-4 text-lg text-neutral-600">Discover the perfect styles for every season</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
					{seasonalCollections.map((collection) => {
						const IconComponent = collection.icon;
						return (
							<div
								key={collection.id}
								className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${collection.bgColor} p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
							>
								<div className="mb-6 flex items-start justify-between">
									<div className="flex items-center gap-3">
										<div className={`rounded-full bg-gradient-to-r p-3 ${collection.color} text-white`}>
											<IconComponent className="h-6 w-6" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-neutral-900">{collection.name}</h3>
											<p className="text-sm text-neutral-600">{collection.items} items available</p>
										</div>
									</div>
									<span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-green-600 shadow-sm">
										{collection.discount}
									</span>
								</div>

								<p className="mb-6 leading-relaxed text-neutral-700">{collection.description}</p>

								<div className="relative mb-6 overflow-hidden rounded-lg">
									<img
										src={collection.image}
										alt={collection.name}
										className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>

								<LinkWithChannel
									href={`/collections/${collection.name.toLowerCase().replace(/\s+/g, "-")}`}
									className={`inline-flex items-center rounded-lg bg-gradient-to-r ${collection.color} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2`}
								>
									Shop {collection.name}
									<IconComponent className="ml-2 h-4 w-4" />
								</LinkWithChannel>
							</div>
						);
					})}
				</div>

				<div className="mt-12 text-center">
					<LinkWithChannel
						href="/collections"
						className="inline-flex items-center rounded-md border-2 border-neutral-900 bg-transparent px-8 py-3 text-base font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
					>
						View All Collections
						<Leaf className="ml-2 h-4 w-4" />
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
};
