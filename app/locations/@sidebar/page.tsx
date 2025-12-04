import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import LocationFilterForm from "../(components)/location-filter-form";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  return (
    <Suspense>
      <LocationFilterForm searchParams={searchParams} />
    </Suspense>
  );
};
export default Page;
