import { fetchQuery } from "convex/nextjs";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Props = {
  locationId: Promise<string>;
};

const LocationDetail = async ({ locationId: locationIdPromise }: Props) => {
  const locationId = await locationIdPromise;
  return <LocationDetailImpl locationId={locationId as Id<"locations">} />;
};

const LocationDetailImpl = async ({
  locationId,
}: {
  locationId: Id<"locations">;
}) => {
  "use cache";

  const location = await fetchQuery(api.locations.get, { id: locationId });

  if (!location) {
    return <span>Select a location</span>;
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button asChild>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "lg",
          })}
          href={`/locations/${location._id}/edit`}
        >
          Edit Location <Pencil />
        </Link>
      </Button>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};

export default LocationDetail;
