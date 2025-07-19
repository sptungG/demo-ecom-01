import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "ACME Storefront",
	description: "Performant e-commerce experiences",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<div className="f">
				<div className="flex flex-col">
					<h3 className="text-6xl font-[600]">Up to 50% off!</h3>
					<p className="text-xl">{`Don't miss out on some very special items at extraordinary sale prices. For a limited time!`}</p>
				</div>
			</div>
			<ProductList products={products} />
		</section>
	);
}
