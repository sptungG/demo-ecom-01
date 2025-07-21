import React from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { TrendingUp } from "lucide-react";

export const TrendingSection = () => {
	const trendingItems = [
		{
			id: 1,
			name: "Summer Dresses",
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
			category: "Dresses",
			trend: "+45%",
		},
		{
			id: 2,
			name: "Denim Jackets",
			image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
			category: "Outerwear",
			trend: "+32%",
		},
		{
			id: 3,
			name: "Sneakers",
			image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
			category: "Footwear",
			trend: "+28%",
		},
		{
			id: 4,
			name: "Accessories",
			image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
			category: "Jewelry",
			trend: "+38%",
		},
	];

	return (
		<section className="bg-neutral-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Trending Now</h2>
					<p className="mt-4 text-lg text-neutral-600">
						{"Discover what's hot this season and stay ahead of the fashion curve"}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{trendingItems.map((item) => (
						<div
							key={item.id}
							className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
						>
							<div className="relative h-80 overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-white/80">{item.category}</p>
											<h3 className="text-lg font-semibold text-white">{item.name}</h3>
										</div>
										<span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-bold text-white">
											{item.trend}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<LinkWithChannel
						href="/search?q=trending"
						className="inline-flex items-center rounded-md border border-transparent bg-neutral-900 px-8 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
					>
						Explore Trends
						<TrendingUp className="ml-2 h-4 w-4" />
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
};
