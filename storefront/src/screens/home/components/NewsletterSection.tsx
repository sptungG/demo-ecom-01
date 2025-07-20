import React from "react";

export const NewsletterSection = () => {
	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Stay Updated</h2>
					<p className="mt-4 text-lg text-neutral-600">
						Subscribe to our newsletter for the latest updates and exclusive offers
					</p>
					<div className="mx-auto mt-8 flex max-w-md">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 rounded-l-md border border-neutral-300 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
						/>
						<button
							type="submit"
							className="rounded-r-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
						>
							Subscribe
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};