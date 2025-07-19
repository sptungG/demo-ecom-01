import React from "react";
import type { ProductListItemFragment } from "@/gql/graphql";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProductsSection } from "./components/FeaturedProductsSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { NewsletterSection } from "./components/NewsletterSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Category } from "./components/CategoryCard";

const HomePage = ({
	products,
	categories,
}: {
	products: readonly ProductListItemFragment[];
	categories: Category[];
}) => {
	return (
		<div className="min-h-screen bg-white">
			<HeroSection />
			<FeaturedProductsSection products={(products as any) ?? []} />
			<CategoriesSection categories={(categories as any) ?? []} />
			<PromotionalBanner />
			<NewsletterSection />
			<FeaturesSection />
		</div>
	);
};

export default HomePage;
