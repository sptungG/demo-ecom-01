import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import { executeGraphQL } from "@/lib/graphql";
import {
	CheckoutAddLineDocument,
	ProductDetailsDocument,
	ProductListDocument,
	RelatedProductsDocument,
} from "@/gql/graphql";
import ProductDetail from "@/screens/products/product-detail/ProductDetail";
import { revalidatePath } from "next/cache";
import invariant from "ts-invariant";
import * as Checkout from "@/lib/checkout";
import { formatMoney, formatMoneyRange } from "@/lib/utils";

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
		searchParams: Promise<{ variant?: string }>;
	},
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName = product.seoTitle || product.name;
	const variantName = product.variants?.find(({ id }) => id === searchParams.variant)?.name;
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	return {
		title: `${product.name} | ${product.seoTitle || (await parent).title?.absolute}`,
		description: product.seoDescription || productNameAndVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		openGraph: product.thumbnail
			? {
					images: [
						{
							url: product.thumbnail.url,
							alt: product.name,
						},
					],
				}
			: null,
	};
}

export async function generateStaticParams({ params }: { params: { channel: string } }) {
	const { products } = await executeGraphQL(ProductListDocument, {
		revalidate: 60,
		variables: { first: 20, channel: params.channel },
		withAuth: false,
	});

	const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
	return paths;
}

// const parser = edjsHTML();

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}
	const { category } = await executeGraphQL(RelatedProductsDocument, {
		variables: {
			channel: params.channel,
			excludeProductId: product!.id,
			categoryId: product!.category?.id as string,
		},
		revalidate: 60,
	});
	// const firstImage = product.thumbnail;
	// const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);
	const currentImage = selectedVariant?.media?.[0];

	async function addItem(variantId: string, quantity: number = 1) {
		"use server";
		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});
		invariant(checkout, "This should never happen");

		await Checkout.saveIdToCookie(params.channel, checkout.id);

		if (!variantId) {
			return;
		}

		// Add multiple quantities support
		for (let i = 0; i < quantity; i++) {
			await executeGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: variantId,
				},
				cache: "no-cache",
			});
		}

		revalidatePath("/cart");
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
			? formatMoneyRange({
					start: product?.pricing?.priceRange?.start?.gross,
					stop: product?.pricing?.priceRange?.stop?.gross,
				})
			: "";

	const relatedProducts = category?.products?.edges
		?.map(({ node }) => node)
		.filter((item) => {
			return item.id !== product.id;
		});
	return (
		// <section className="mx-auto grid max-w-7xl p-8">
		// 	<script
		// 		type="application/ld+json"
		// 		dangerouslySetInnerHTML={{
		// 			__html: JSON.stringify(productJsonLd),
		// 		}}
		// 	/>
		// 	<form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8" action={addItem}>
		// 		<div className="md:col-span-1 lg:col-span-5">
		// 			{firstImage && (
		// 				<ProductImageWrapper
		// 					priority={true}
		// 					alt={firstImage.alt ?? ""}
		// 					width={1024}
		// 					height={1024}
		// 					src={firstImage.url}
		// 				/>
		// 			)}
		// 		</div>
		// 		<div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
		// 			<div>
		// 				<h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
		// 					{product?.name}
		// 				</h1>
		// 				<p className="mb-8 text-sm " data-testid="ProductElement_Price">
		// 					{price}
		// 				</p>

		// 				{variants && (
		// 					<VariantSelector
		// 						selectedVariant={selectedVariant}
		// 						variants={variants}
		// 						product={product}
		// 						channel={params.channel}
		// 					/>
		// 				)}
		// 				<AvailabilityMessage isAvailable={isAvailable} />
		// 				<div className="mt-8">
		// 					<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
		// 				</div>
		// 				{description && (
		// 					<div className="mt-8 space-y-6 text-sm text-neutral-500">
		// 						{description.map((content) => (
		// 							<div key={content} dangerouslySetInnerHTML={{ __html: xss(content) }} />
		// 						))}
		// 					</div>
		// 				)}
		// 			</div>
		// 		</div>
		// 	</form>
		// </section>
		<ProductDetail
			currentImage={currentImage as any}
			price={price as string}
			product={product}
			relatedProducts={relatedProducts ?? []}
			channel={params.channel}
			addItemAction={addItem}
		/>
	);
}
