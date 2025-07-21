"use client";

import React, { useState } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { X, Gift, Tag } from "lucide-react";

export const PromotionalBanner = () => {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div className="sticky top-0 z-50 border-b border-neutral-700 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white shadow-lg">
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute left-4 top-4 h-8 w-8 animate-pulse rounded-full bg-white"></div>
				<div className="absolute right-8 top-8 h-4 w-4 rounded-full bg-white"></div>
				<div className="absolute bottom-4 left-1/2 h-6 w-6 animate-pulse rounded-full bg-white"></div>
			</div>

			<div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Content */}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<Gift className="h-5 w-5 animate-bounce text-yellow-400" />
							<Tag className="h-4 w-4 text-neutral-300" />
						</div>
						<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
							<span className="text-sm font-medium">
								🎉 <span className="font-bold text-yellow-300">WELCOME OFFER:</span> Free Shipping on Orders
								Over $50
							</span>
							<span className="hidden text-neutral-400 sm:inline">|</span>
							<span className="text-xs text-neutral-300">
								Use code:{" "}
								<span className="rounded bg-neutral-800 px-2 py-1 font-mono font-bold text-yellow-300">
									WELCOME10
								</span>{" "}
								for 10% off
							</span>
						</div>
					</div>

					{/* CTA Button */}
					<div className="flex items-center gap-3">
						<LinkWithChannel
							href="/products"
							className="hidden transform items-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-md transition-all duration-200 hover:scale-105 hover:bg-yellow-300 hover:shadow-lg sm:inline-flex"
						>
							Shop Now
						</LinkWithChannel>

						{/* Close button */}
						<button
							onClick={() => setIsVisible(false)}
							className="rounded-full p-1.5 text-neutral-400 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
							aria-label="Close promotional banner"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
