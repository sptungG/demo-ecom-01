import React from "react";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
	const testimonials = [
		{
			id: 1,
			name: "Sarah Johnson",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			comment:
				"Amazing quality and fast delivery! The dress I ordered fits perfectly and looks even better than in the photos. Will definitely shop here again!",
			location: "New York, NY",
			verified: true,
		},
		{
			id: 2,
			name: "Michael Chen",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			comment:
				"Great customer service and excellent product selection. The sneakers I bought are super comfortable and stylish. Highly recommend!",
			location: "Los Angeles, CA",
			verified: true,
		},
		{
			id: 3,
			name: "Emily Rodriguez",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			comment:
				"Love the variety of brands and the easy return process. Found exactly what I was looking for at a great price. Thank you!",
			location: "Miami, FL",
			verified: true,
		},
		{
			id: 4,
			name: "David Thompson",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
			rating: 5,
			comment:
				"Outstanding shopping experience! The website is easy to navigate and the checkout process was smooth. Products arrived on time.",
			location: "Chicago, IL",
			verified: true,
		},
	];

	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<div className="mb-4 flex items-center justify-center gap-2">
						<Quote className="h-6 w-6 text-blue-600" />
					</div>
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
						What Our Customers Say
					</h2>
					<p className="mt-4 text-lg text-neutral-600">
						Join thousands of satisfied customers who love shopping with us
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="relative rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							{/* Quote icon */}
							<div className="absolute -top-3 left-6">
								<div className="rounded-full bg-blue-600 p-2 text-white">
									<Quote className="h-4 w-4" />
								</div>
							</div>

							{/* Rating */}
							<div className="mb-4 mt-2 flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < testimonial.rating ? "fill-current text-yellow-400" : "text-gray-300"
										}`}
									/>
								))}
							</div>

							{/* Comment */}
							<blockquote className="mb-6 leading-relaxed text-neutral-700">
								{`"${testimonial.comment}"`}
							</blockquote>

							{/* Customer info */}
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<img
										className="h-12 w-12 rounded-full object-cover"
										src={testimonial.avatar}
										alt={testimonial.name}
									/>
								</div>
								<div className="ml-4">
									<div className="flex items-center">
										<p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
										{testimonial.verified && (
											<span className="ml-1 text-blue-600">
												<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
													<path
														fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										)}
									</div>
									<p className="text-xs text-neutral-500">{testimonial.location}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Stats */}
				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600">50K+</div>
						<div className="text-sm text-neutral-600">Happy Customers</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-green-600">4.9/5</div>
						<div className="text-sm text-neutral-600">Average Rating</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-purple-600">24/7</div>
						<div className="text-sm text-neutral-600">Customer Support</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-orange-600">100%</div>
						<div className="text-sm text-neutral-600">Satisfaction Rate</div>
					</div>
				</div>

				<div className="mt-12 text-center">
					<button className="inline-flex items-center rounded-md border-2 border-neutral-900 bg-transparent px-8 py-3 text-base font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2">
						Read More Reviews
						<Quote className="ml-2 h-4 w-4" />
					</button>
				</div>
			</div>
		</section>
	);
};
