import { preloadQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import LocationImageForm from "../../(components)/location-image-form";

type PageProps = {
  params: Promise<{
    locationId: string;
  }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;

  if (!params.locationId) {
    notFound();
  }

  const location = await preloadQuery(api.locations.get, {
    id: params.locationId as Id<"locations">,
  });

  if (!location) {
    notFound();
  }
  return <LocationImageForm preloadedLocation={location} />;
};
export default Page;
