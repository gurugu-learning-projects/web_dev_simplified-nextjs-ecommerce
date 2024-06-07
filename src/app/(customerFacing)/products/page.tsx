import { Suspense } from "react";
import { ProductCard, ProductCardSkeleton2 } from "@/components/ProductCard";
import db from "@/db/db";

function getProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
            <ProductCardSkeleton2 />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
}

async function ProductSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
