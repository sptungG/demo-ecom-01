import React from "react";
import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const PromotionalBanner = () => {
	return (
		<section className="bg-neutral-900 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Special Offer</h2>
						<p className="mt-4 text-lg text-neutral-300">
							Get 20% off on your first order. Use code WELCOME20 at checkout.
						</p>
						<div className="mt-8">
							<LinkWithChannel
								href="/products"
								className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
							>
								Shop Now
							</LinkWithChannel>
						</div>
					</div>
					<div className="relative">
						<Image
							src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=300&fit=crop"
							alt="Special Offer"
							width={500}
							height={300}
							className="rounded-lg shadow-xl"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};