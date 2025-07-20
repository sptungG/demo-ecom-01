import { FeaturedProductsSection } from "./components/FeaturedProductsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HeroSection } from "./components/HeroSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { TrendingSection } from "./components/TrendingSection";
import { BrandShowcaseSection } from "./components/BrandShowcaseSection";
import { InstagramFeedSection } from "./components/InstagramFeedSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { SeasonalCollectionSection } from "./components/SeasonalCollectionSection";
import type { ProductListItemFragment } from "@/gql/graphql";

const HomePage = ({ products }: { products: readonly ProductListItemFragment[]; categories?: any[] }) => {
	return (
		<div className="min-h-screen bg-white">
			<HeroSection />
			<PromotionalBanner />
			<FeaturesSection />
			<TrendingSection />
			<FeaturedProductsSection products={(products as any) ?? []} />

			{/* <SeasonalCollectionSection /> */}
			{/* <BrandShowcaseSection /> */}
			<InstagramFeedSection />
			{/* <TestimonialsSection /> */}

			<NewsletterSection />
		</div>
	);
};

export default HomePage;
