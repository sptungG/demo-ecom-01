import Image from "next/image";
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
		<section className="pb-16">
			<div className="bg-[#e1e6ef]">
				<div className="mx-auto flex w-full max-w-7xl justify-between pt-10">
					<div className="flex w-full max-w-[500px] flex-col justify-center">
						<h3 className="mb-5 text-5xl font-[600]">Up to 50% off!</h3>
						<p className="text-xl">{`Don't miss out on some very special items at extraordinary sale prices. For a limited time!`}</p>
					</div>
					<div className="">
						<Image
							src={"/hero_girl_optimized_0321.webp"}
							alt="hero_girl_optimized_0321"
							width={1000}
							height={1000}
							className="h-[415px] w-auto object-cover"
						/>
					</div>
				</div>
			</div>
			<div className="mx-auto w-full max-w-7xl p-8">
				<h2 className="mb-5 text-center text-3xl font-[600]">Featured Products</h2>
				<ProductList products={products} />
			</div>
		</section>
	);
}
