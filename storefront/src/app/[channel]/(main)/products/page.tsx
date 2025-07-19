import { notFound } from "next/navigation";
import { ProductsPerPage } from "@/app/config";
import { ProductListPaginatedDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import ProductsPage from "@/screens/products/ProductsPage";

export const metadata = {
	title: "Products · Storefront",
	description: "All products in Storefront",
};

export default async function Page(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{
		cursor: string | string[] | undefined;
	}>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;

	const { products } = await executeGraphQL(ProductListPaginatedDocument, {
		variables: {
			first: ProductsPerPage,
			after: cursor,
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	return <ProductsPage channel={params.channel} initialProducts={products.edges.map((e) => e.node)} />;
}
