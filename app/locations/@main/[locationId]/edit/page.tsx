import { Suspense } from "react";
import LocationImageEdit from "@/app/locations/(components)/location-image-edit";

type PageProps = {
  params: Promise<{
    locationId: string;
  }>;
};

const Page = async (props: PageProps) => {
  const locationIdPromise = props.params.then(({ locationId }) => locationId);
  return (
    <Suspense fallback={<div>Loading location...</div>}>
      <LocationImageEdit locationId={locationIdPromise} />
    </Suspense>
  );
};
export default Page;
