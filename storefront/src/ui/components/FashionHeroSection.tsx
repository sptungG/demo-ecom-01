import React from "react";

interface FashionCategory {
	count: string;
	label: string;
	icon: string;
}

interface FashionHeroSectionProps {
	className?: string;
}

const fashionCategories: FashionCategory[] = [
	{ count: "30+", label: "Men's Wear", icon: "👔" },
	{ count: "25+", label: "Women's Wear", icon: "👗" },
	{ count: "15+", label: "Kids' Clothing", icon: "👶" },
	{ count: "12+", label: "Sportswear", icon: "🏃" },
	{ count: "10+", label: "Accessories", icon: "👜" },
];

const CategoryCard: React.FC<FashionCategory> = ({ count, label }) => (
	<div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-200 hover:bg-white hover:shadow-xl">
		<div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<div className="relative text-center">
			<div className="flex items-center justify-center gap-2">
				<div className="mb-3 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-4xl font-black text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600">
					{count}
				</div>
				<div className="mb-1 text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
					Items
				</div>
			</div>
			{/* Category label */}
			<div className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
				{label}
			</div>
		</div>

		{/* Subtle accent line */}
		<div className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 transform bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
	</div>
);

const FashionHeroSection: React.FC<FashionHeroSectionProps> = ({ className = "" }) => {
	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-stone-50 ${className}`}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="bg-dots absolute inset-0"></div>
			</div>

			<div className="relative mx-auto max-w-7xl px-6 py-6 lg:py-8">
				<div className="grid grid-cols-2">
					{/* Headline */}
					<h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
						<span className="block font-extralight text-gray-600">Trendy and</span>
						<span className="block font-medium leading-tight text-gray-900">Comfortable</span>
						<span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text font-semibold leading-tight text-transparent">
							Clothing Collection
						</span>
					</h1>

					{/* Description */}
					<p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
						Discover our curated collection of contemporary fashion, where elegance meets versatility. Each
						piece is carefully selected for its exceptional quality, timeless design, and comfort that adapts
						to your lifestyle.
					</p>
				</div>
				<hr className="my-8" />
				{/* Categories */}
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
					{fashionCategories.map((category, index) => (
						<CategoryCard key={index} {...category} />
					))}
				</div>
			</div>
		</section>
	);
};

export default FashionHeroSection;
