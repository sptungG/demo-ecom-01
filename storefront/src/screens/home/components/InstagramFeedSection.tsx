import React from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { Instagram, Heart, MessageCircle } from "lucide-react";

export const InstagramFeedSection = () => {
	const instagramPosts = [
		{
			id: 1,
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
			likes: 1247,
			comments: 89,
			username: "@fashionista",
			caption: "Summer vibes ☀️ #fashion #summer",
		},
		{
			id: 2,
			image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
			likes: 892,
			comments: 56,
			username: "@styleblogger",
			caption: "Perfect dress for any occasion 👗 #dress #style",
		},
		{
			id: 3,
			image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
			likes: 1567,
			comments: 123,
			username: "@trendsetter",
			caption: "Denim never goes out of style 🧥 #denim #fashion",
		},
		{
			id: 4,
			image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
			likes: 2034,
			comments: 167,
			username: "@shoelover",
			caption: "New kicks alert! 👟 #sneakers #shoes",
		},
		{
			id: 5,
			image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
			likes: 756,
			comments: 43,
			username: "@accessories",
			caption: "Accessories make the outfit ✨ #jewelry #accessories",
		},
		{
			id: 6,
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
			likes: 1345,
			comments: 98,
			username: "@fashionforward",
			caption: "Weekend outfit inspo 💫 #weekend #outfit",
		},
	];

	return (
		<section className="bg-neutral-50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<div className="mb-4 flex items-center justify-center gap-2">
						<Instagram className="h-6 w-6 text-neutral-600" />
					</div>
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">Follow Our Style</h2>
					<p className="mt-4 text-lg text-neutral-600">
						Get inspired by our latest fashion posts and join the community
					</p>
					<div className="mt-6">
						<a
							href="https://instagram.com/yourstore"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center font-medium text-neutral-600 hover:text-neutral-800"
						>
							<Instagram className="mr-2 h-5 w-5" />
							@yourstore
						</a>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{instagramPosts.map((post) => (
						<div
							key={post.id}
							className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
						>
							<div className="relative aspect-square overflow-hidden">
								<img
									src={post.image}
									alt={post.caption}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />

								{/* Overlay with engagement info */}
								<div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<div className="text-center text-white">
										<div className="mb-2 flex items-center justify-center space-x-4">
											<div className="flex items-center">
												<Heart className="mr-1 h-4 w-4" />
												<span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
											</div>
											<div className="flex items-center">
												<MessageCircle className="mr-1 h-4 w-4" />
												<span className="text-sm font-medium">{post.comments}</span>
											</div>
										</div>
										<p className="px-2 text-xs">{post.username}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<LinkWithChannel
							href="/search?q=instagram"
							className="inline-flex items-center rounded-md border border-transparent bg-neutral-900 px-8 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
						>
							Shop Instagram Looks
							<Instagram className="ml-2 h-4 w-4" />
						</LinkWithChannel>

						<a
							href="https://instagram.com/yourstore"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center rounded-md border-2 border-neutral-900 bg-transparent px-8 py-3 text-base font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
						>
							Follow on Instagram
							<Instagram className="ml-2 h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
