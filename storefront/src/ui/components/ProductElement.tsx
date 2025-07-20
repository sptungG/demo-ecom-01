import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement" className="group">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="transition-transform duration-300 ease-in-out group-hover:scale-105">
					{product?.thumbnail?.url && (
						<div className="overflow-hidden rounded-lg">
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ""}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
								className="transition-transform duration-300 ease-in-out group-hover:scale-110"
							/>
						</div>
					)}
					<div className="mt-2 flex justify-between">
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900 transition-colors duration-200 group-hover:text-neutral-700">
								{product.name}
							</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900 transition-colors duration-200 group-hover:text-neutral-600" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
