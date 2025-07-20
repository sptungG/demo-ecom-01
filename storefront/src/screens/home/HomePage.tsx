import { FeaturedProductsSection } from "./components/FeaturedProductsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HeroSection } from "./components/HeroSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { PromotionalBanner } from "./components/PromotionalBanner";
import type { ProductListItemFragment } from "@/gql/graphql";

const HomePage = ({ products }: { products: readonly ProductListItemFragment[]; categories?: any[] }) => {
	return (
		<div className="min-h-screen bg-white">
			<HeroSection />
			<FeaturedProductsSection products={(products as any) ?? []} />
			{/* <CategoriesSection categories={(categories as any) ?? []} /> */}
			<PromotionalBanner />
			<NewsletterSection />
			<FeaturesSection />
		</div>
	);
};

export default HomePage;
