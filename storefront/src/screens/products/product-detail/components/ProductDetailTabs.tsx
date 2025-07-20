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
		{ id: "description", label: "Mô tả sản phẩm" },
		{ id: "specifications", label: "Thông số kỹ thuật" },
		{ id: "reviews", label: "Đánh giá (128)" },
		{ id: "shipping", label: "Vận chuyển & Đổi trả" },
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
					<p>Chưa có mô tả cho sản phẩm này.</p>
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
				<h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
				<div className="space-y-2">
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Tên sản phẩm:</span>
						<span className="font-medium">{product.name}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Danh mục:</span>
						<span className="font-medium">{product.category?.name || "Chưa phân loại"}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">SKU:</span>
						<span className="font-medium">{product.id.slice(-8)}</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Số lượng có sẵn:</span>
						<span className="font-medium">{(selectedVariant as any)?.quantityAvailable ?? 0}</span>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Thông tin bổ sung</h3>
				<div className="space-y-2">
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Thương hiệu:</span>
						<span className="font-medium">Demo Brand</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Xuất xứ:</span>
						<span className="font-medium">Việt Nam</span>
					</div>
					<div className="flex justify-between border-b border-gray-100 py-2">
						<span className="text-gray-600">Bảo hành:</span>
						<span className="font-medium">12 tháng</span>
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
			<h3 className="text-lg font-semibold">Đánh giá khách hàng</h3>
			<button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
				Viết đánh giá
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
				<div className="mt-1 text-sm text-gray-600">128 đánh giá</div>
			</div>

			<div className="space-y-2 md:col-span-2">
				{[5, 4, 3, 2, 1].map((rating) => (
					<div key={rating} className="flex items-center space-x-3">
						<span className="w-8 text-sm">{rating} sao</span>
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
								<div className="font-medium">Khách hàng {review}</div>
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
						<span className="text-sm text-gray-500">2 ngày trước</span>
					</div>
					<p className="text-gray-700">
						Sản phẩm chất lượng tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop lần
						sau.
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
			<h3 className="mb-4 text-lg font-semibold">Chính sách vận chuyển</h3>
			<div className="space-y-3 text-gray-700">
				<p>• Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
				<p>• Giao hàng trong 1-3 ngày làm việc</p>
				<p>• Hỗ trợ giao hàng toàn quốc</p>
				<p>• Đóng gói cẩn thận, bảo đảm hàng nguyên vẹn</p>
			</div>
		</div>

		<div>
			<h3 className="mb-4 text-lg font-semibold">Chính sách đổi trả</h3>
			<div className="space-y-3 text-gray-700">
				<p>• Đổi trả miễn phí trong 30 ngày</p>
				<p>• Sản phẩm còn nguyên tem, nhãn mác</p>
				<p>• Hoàn tiền 100% nếu lỗi từ nhà sản xuất</p>
				<p>• Hỗ trợ đổi size, màu sắc (nếu còn hàng)</p>
			</div>
		</div>
	</div>
);

export default ProductDetailTabs;
