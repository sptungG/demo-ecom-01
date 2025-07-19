import React from "react";
import Image from "next/image";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const HeroSection = () => {
	return (
		<section className="relative bg-gradient-to-r from-neutral-900 to-neutral-700 text-white">
			<div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<div>
						<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Discover Amazing Products</h1>
						<p className="mt-6 text-lg leading-8 text-neutral-300">
							Shop the latest trends and find everything you need in one place. Quality products,
							competitive prices, and exceptional service.
						</p>
						<div className="mt-10 flex items-center gap-x-6">
							<LinkWithChannel
								href="/products"
								className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								Shop Now
							</LinkWithChannel>
							<LinkWithChannel
								href="/categories"
								className="text-sm font-semibold leading-6 text-white hover:text-neutral-300"
							>
								Browse Categories <span aria-hidden="true">→</span>
							</LinkWithChannel>
						</div>
					</div>
					<div className="relative">
						<Image
							src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
							alt="Hero Image"
							width={600}
							height={400}
							className="rounded-lg shadow-2xl"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};