import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import LocationImageForm from "./location-image-form";

const LocationImageEdit = async ({
  locationId: locationIdPromise,
}: {
  locationId: Promise<string>;
}) => {
  const locationId = await locationIdPromise;
  const preloadedLocation = await preloadQuery(api.locations.get, {
    id: locationId as Id<"locations">,
  });
  return <LocationImageForm preloadedLocation={preloadedLocation} />;
};
export default LocationImageEdit;
