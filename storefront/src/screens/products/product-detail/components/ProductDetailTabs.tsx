import React, { useState } from "react";
import { Star } from "lucide-react";
import EditorJsHtml from "editorjs-html";
import { ProductDetailsQuery } from "@/gql/graphql";
const edjsParser = EditorJsHtml();

interface ProductDetailTabsProps {
	product: NonNullable<ProductDetailsQuery["product"]>;
	selectedVariant?: NonNullable<ProductDetailsQuery["product"]>["variants"] extends (infer T)[] ? T : never;
}

const ProductDetailTabs = ({ product, selectedVariant }: ProductDetailTabsProps) => {
	const [activeTab, setActiveTab] = useState("description");
	const tabs = [
		{ id: "description", label: "Product Description" },
		{ id: "specifications", label: "Specifications" },
		{ id: "reviews", label: "Reviews (128)" },
		{ id: "shipping", label: "Shipping & Returns" },
	];

	return (
		<div className="mt-6">
			{/* Tab Navigation */}
			<div className="border-b border-gray-200">
				<nav className="flex space-x-8">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
								activeTab === tab.id
									? "border-blue-500 text-blue-600"
									: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
							}`}
						>
							{tab.label}
						</button>
					))}
				</nav>
			</div>

			{/* Tab Content */}
			<div className="py-4">
				{activeTab === "description" && <DescriptionTab product={product} />}

				{activeTab === "specifications" && (
					<SpecificationsTab product={product} selectedVariant={selectedVariant} />
				)}

				{activeTab === "reviews" && <ReviewsTab />}

				{activeTab === "shipping" && <ShippingTab />}
			</div>
		</div>
	);
};

// Description Tab Component
const DescriptionTab: React.FC<{ product: NonNullable<ProductDetailsQuery["product"]> }> = ({ product }) => {
	const htmlBlocks = product.description ? edjsParser.parse(JSON.parse(product.description) ?? {}) : [];
	return (
		<div className="prose max-w-none">
			<div className="leading-relaxed text-gray-700">
				{product.description ? (
					((htmlBlocks as any[]) ?? [])?.map((html, idx) => {
						return <div dangerouslySetInnerHTML={{ __html: html }} key={idx} />;
					})
				) : (
					<p>No description available for this product.</p>
				)}
			</div>
		</div>
	);
};

// Specifications Tab Component
const SpecificationsTab: React.FC<{
	product: NonNullable<ProductDetailsQuery["product"]>;
	selectedVariant?: NonNullable<ProductDetailsQuery["product"]>["variants"] extends (infer T)[] ? T : never;
}> = ({ product, selectedVariant }) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Basic Information</h3>
				<div className="space-y-2">
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Product Name:</span>
						<span className="font-medium">{product.name}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Category:</span>
						<span className="font-medium">{product.category?.name || "Uncategorized"}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">SKU:</span>
						<span className="font-medium">{product.id.slice(-8)}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Available Quantity:</span>
						<span className="font-medium">{(selectedVariant as any)?.quantityAvailable ?? 0}</span>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Additional Information</h3>
				<div className="space-y-2">
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Brand:</span>
						<span className="font-medium">Demo Brand</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Origin:</span>
						<span className="font-medium">Vietnam</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Warranty:</span>
						<span className="font-medium">12 months</span>
					</div>
				</div>
			</div>
		</div>
	);
};
// Reviews Tab Component
const ReviewsTab: React.FC = () => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<h3 className="text-lg font-semibold">Customer Reviews</h3>
			<button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
				Write Review
			</button>
		</div>

		<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div className="text-center">
				<div className="text-4xl font-bold text-gray-900">4.0</div>
				<div className="mt-1 flex items-center justify-center">
					{[1, 2, 3, 4, 5].map((star) => (
						<Star
							key={star}
							className={`h-5 w-5 ${star <= 4 ? "fill-current text-yellow-400" : "text-gray-300"}`}
						/>
					))}
				</div>
				<div className="mt-1 text-sm text-gray-600">128 reviews</div>
			</div>

			<div className="space-y-2 md:col-span-2">
				{[5, 4, 3, 2, 1].map((rating) => (
					<div key={rating} className="flex items-center space-x-3">
						<span className="w-8 text-sm">{rating} star</span>
						<div className="h-2 flex-1 rounded-full bg-gray-200">
							<div
								className="h-2 rounded-full bg-yellow-400"
								style={{
									width: `${rating === 4 ? 60 : rating === 5 ? 30 : rating === 3 ? 8 : 2}%`,
								}}
							></div>
						</div>
						<span className="w-8 text-sm text-gray-600">
							{rating === 4 ? 77 : rating === 5 ? 38 : rating === 3 ? 10 : 3}
						</span>
					</div>
				))}
			</div>
		</div>

		<div className="space-y-4">
			{[1, 2, 3].map((review) => (
				<div key={review} className="rounded-lg border border-gray-200 p-4">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="h-8 w-8 rounded-full bg-gray-300"></div>
							<div>
								<div className="font-medium">Customer {review}</div>
								<div className="flex items-center">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`h-4 w-4 ${star <= 4 ? "fill-current text-yellow-400" : "text-gray-300"}`}
										/>
									))}
								</div>
							</div>
						</div>
						<span className="text-sm text-gray-500">2 days ago</span>
					</div>
					<p className="text-gray-700">
						Great product quality, exactly as described. Fast delivery, carefully packaged. Will support the shop again.
					</p>
				</div>
			))}
		</div>
	</div>
);

// Shipping Tab Component
const ShippingTab: React.FC = () => (
	<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
		<div>
			<h3 className="mb-4 text-lg font-semibold">Shipping Policy</h3>
			<div className="space-y-3 text-gray-700">
				<p>• Free shipping for orders over $50</p>
				<p>• Delivery within 1-3 business days</p>
				<p>• Nationwide shipping support</p>
				<p>• Careful packaging, guaranteed intact delivery</p>
			</div>
		</div>

		<div>
			<h3 className="mb-4 text-lg font-semibold">Return Policy</h3>
			<div className="space-y-3 text-gray-700">
				<p>• Free returns within 30 days</p>
				<p>• Product must have original tags and labels</p>
				<p>• 100% refund if manufacturer defect</p>
				<p>• Support size and color exchange (if available)</p>
			</div>
		</div>
	</div>
);

export default ProductDetailTabs;
