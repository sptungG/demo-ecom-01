import React from "react";
import { FeatureItem } from "./FeatureItem";

export const FeaturesSection = () => {
	return (
		<section className="bg-neutral-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<FeatureItem
						icon={
							<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						}
						title="Free Shipping"
						description="Free shipping on orders over $50"
					/>

					<FeatureItem
						icon={
							<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						}
						title="Quality Guarantee"
						description="30-day money back guarantee"
					/>

					<FeatureItem
						icon={
							<svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
								/>
							</svg>
						}
						title="24/7 Support"
						description="Round-the-clock customer support"
					/>
				</div>
			</div>
		</section>
	);
};