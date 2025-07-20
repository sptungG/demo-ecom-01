import { ProductsPerPage } from "@/app/config";
import { ProductListPaginatedDocument, StockAvailability } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import ProductsPage from "@/screens/products/ProductsPage";
import { FilterState } from "@/ui/components/ProductFilter";

interface ProductsPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
	params: Promise<{ channel: string }>;
}

export default async function Products({ searchParams, params }: ProductsPageProps) {
	const getSearchParams = await searchParams;
	const getParams = await params;
	const channel = process.env.NEXT_PUBLIC_SALEOR_CHANNEL ?? "";

	// Parse search params to create GraphQL filter
	const filter: any = {};

	// Search
	if (getSearchParams.search) {
		filter.search = getSearchParams.search as string;
	}

	// Categories
	const categories = Array.isArray(getSearchParams.category)
		? getSearchParams.category
		: getSearchParams.category
			? [getSearchParams.category]
			: [];
	if (categories.length > 0) {
		filter.categories = categories;
	}

	// Collections
	const collections = Array.isArray(getSearchParams.collection)
		? getSearchParams.collection
		: getSearchParams.collection
			? [getSearchParams.collection]
			: [];
	if (collections.length > 0) {
		filter.collections = collections;
	}

	// Product Types
	const productTypes = Array.isArray(getSearchParams.productType)
		? getSearchParams.productType
		: getSearchParams.productType
			? [getSearchParams.productType]
			: [];
	if (productTypes.length > 0) {
		filter.productTypes = productTypes;
	}

	// Price range
	if (getSearchParams.priceMin || getSearchParams.priceMax) {
		// Custom price inputs take priority
		const minPrice = getSearchParams.priceMin ? Number(getSearchParams.priceMin) : undefined;
		const maxPrice = getSearchParams.priceMax ? Number(getSearchParams.priceMax) : undefined;

		if ((minPrice && !isNaN(minPrice)) || (maxPrice && !isNaN(maxPrice))) {
			filter.price = {
				...(minPrice && !isNaN(minPrice) && { gte: minPrice }),
				...(maxPrice && !isNaN(maxPrice) && { lte: maxPrice }),
			};
		}
	} else if (getSearchParams.priceRange) {
		// Fallback to preset price range
		const [min, max] = (getSearchParams.priceRange as string).split("-").map(Number);
		if (!isNaN(min) || !isNaN(max)) {
			filter.price = {
				...(min && !isNaN(min) && { gte: min }),
				...(max && !isNaN(max) && { lte: max }),
			};
		}
	}

	// Attributes
	const attributeParams = Array.isArray(getSearchParams.attr)
		? getSearchParams.attr
		: getSearchParams.attr
			? [getSearchParams.attr]
			: [];
	if (attributeParams.length > 0) {
		filter.attributes = attributeParams.map((param) => {
			const [slug, ...values] = param.split(":");
			return { slug, values };
		});
	}

	// Boolean filters
	if (getSearchParams.stockAvailability) {
		filter.stockAvailability = getSearchParams.stockAvailability;
	}

	if (getSearchParams.isPublished) {
		filter.isPublished = getSearchParams.isPublished === "true";
	}

	if (getSearchParams.isAvailable) {
		filter.isAvailable = getSearchParams.isAvailable === "true";
	}

	if (getSearchParams.isVisibleInListing) {
		filter.isVisibleInListing = getSearchParams.isVisibleInListing === "true";
	}

	if (getSearchParams.giftCard) {
		filter.giftCard = getSearchParams.giftCard === "true";
	}

	if (getSearchParams.hasCategory) {
		filter.hasCategory = getSearchParams.hasCategory === "true";
	}

	if (getSearchParams.hasPreorderedVariants) {
		filter.hasPreorderedVariants = getSearchParams.hasPreorderedVariants === "true";
	}

	// Date filters
	if (getSearchParams.availableFrom) {
		filter.availableFrom = getSearchParams.availableFrom;
	}

	if (getSearchParams.publishedFrom) {
		filter.publishedFrom = getSearchParams.publishedFrom;
	}

	if (getSearchParams["updatedAt.gte"] || getSearchParams["updatedAt.lte"]) {
		filter.updatedAt = {
			...(getSearchParams["updatedAt.gte"] && { gte: getSearchParams["updatedAt.gte"] }),
			...(getSearchParams["updatedAt.lte"] && { lte: getSearchParams["updatedAt.lte"] }),
		};
	}

	// Sorting
	const sortBy = (getSearchParams.sortBy as string) || "NAME";
	const sortMapping: Record<string, any> = {
		NAME: { field: "NAME", direction: "ASC" },
		NAME_DESC: { field: "NAME", direction: "DESC" },
		PRICE: { field: "PRICE", direction: "ASC" },
		PRICE_DESC: { field: "PRICE", direction: "DESC" },
		DATE: { field: "DATE", direction: "DESC" },
		DATE_ASC: { field: "DATE", direction: "ASC" },
	};

	// Pagination
	const cursor = getSearchParams.cursor as string;

	// Create initial filters for UI
	const initialFilters: FilterState = {
		search: getSearchParams.search as string || "",
		categories: Array.isArray(getSearchParams.category)
			? getSearchParams.category
			: getSearchParams.category
				? [getSearchParams.category]
				: [],
		sortBy: (getSearchParams.sortBy as string) || "NAME",
		stockAvailability: getSearchParams.stockAvailability as StockAvailability,
		priceRange: getSearchParams.priceRange as string,
		price: (() => {
			if (getSearchParams.priceMin || getSearchParams.priceMax) {
				const minPrice = getSearchParams.priceMin ? Number(getSearchParams.priceMin) : undefined;
				const maxPrice = getSearchParams.priceMax ? Number(getSearchParams.priceMax) : undefined;
				return {
					...(minPrice && !isNaN(minPrice) && { gte: minPrice }),
					...(maxPrice && !isNaN(maxPrice) && { lte: maxPrice }),
				};
			}
			return undefined;
		})()
	};

	try {
		const result = await executeGraphQL(ProductListPaginatedDocument, {
			variables: {
				first: ProductsPerPage,
				after: cursor || null,
				channel: getParams.channel,
				filter: Object.keys(filter).length > 0 ? filter : undefined,
				sortBy: sortMapping[sortBy] || sortMapping["NAME"],
			},
		});

		const products = result.products?.edges?.map((edge) => edge.node) || [];
		const pageInfo = result.products?.pageInfo;
		const totalCount = result.products?.totalCount || 0;

		return (
			<ProductsPage
				initialProducts={products}
				initialHasNextPage={pageInfo?.hasNextPage || false}
				initialCursor={pageInfo?.endCursor || null}
				initialTotalCount={totalCount}
				initialFilters={initialFilters}
				channel={channel}
			/>
		);
	} catch (error) {
		console.error("Error fetching products:", error);
		return (
			<ProductsPage
				initialProducts={[]}
				initialHasNextPage={false}
				initialCursor={null}
				initialTotalCount={0}
				initialFilters={initialFilters}
				channel={channel}
			/>
		);
	}
}
