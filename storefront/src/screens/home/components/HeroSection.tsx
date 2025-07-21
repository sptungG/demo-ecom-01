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
							Shop the latest trends and find everything you need in one place. Quality products, competitive
							prices, and exceptional service.
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

					{/* Hero Image with decorative circles */}
					<div className="relative">
						{/* Decorative circles behind the image */}
						<div className="absolute inset-0 flex items-center justify-center">
							{/* Large circle behind the image */}
							<div className="absolute h-80 w-80 rounded-full border border-white/10 bg-white/5"></div>

							{/* Smaller decorative circles */}
							<div className="bg-white/3 absolute left-8 top-8 h-16 w-16 rounded-full border border-white/5"></div>
							<div className="bg-white/2 absolute left-4 top-16 h-8 w-8 rounded-full border border-white/5"></div>
							<div className="bg-white/4 border-white/8 absolute right-12 top-4 h-12 w-12 rounded-full border"></div>
							<div className="bg-white/3 border-white/6 absolute bottom-8 right-8 h-10 w-10 rounded-full border"></div>
							<div className="bg-white/2 border-white/4 absolute bottom-16 left-12 h-6 w-6 rounded-full border"></div>
						</div>

						{/* Main image */}
						<div className="relative z-10">
							<Image
								src="/girl-banner-2.png"
								alt="Hero Image"
								width={600}
								height={400}
								priority
								// className="rounded-lg shadow-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
