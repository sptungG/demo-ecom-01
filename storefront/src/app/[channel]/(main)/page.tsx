import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import HomePage from "@/screens/home/HomePage";

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
	// const { categories } = await executeGraphQL(CategoryListDocument, {
	// 	variables: {
	// 		first: 100,
	// 		after: null,
	// 	},
	// 	revalidate: 60,
	// });

	const products = data.collection?.products.edges.map(({ node: product }) => product);
	// const getCategories = categories?.edges?.map(({ node: category }) => category);
	return <HomePage products={products} categories={[]} />;
}
