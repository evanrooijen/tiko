import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { LocationList } from "./(components)/location-list";

const Page = async () => {
  const preloadedLocations = await preloadQuery(api.locations.list, {});
  return (
    <div>
      <h1>Locations</h1>
      <LocationList preloadedLocations={preloadedLocations} />
    </div>
  );
};
export default Page;
