import { Suspense } from "react";
import LocationDetail from "../../(components)/location-detail";

type PageProps = {
  params: Promise<{
    locationId: string;
  }>;
};

const Page = async (props: PageProps) => {
  const locationIdPromise = props.params.then(({ locationId }) => locationId);

  return (
    <Suspense fallback={<div>Loading location...</div>}>
      <LocationDetail locationId={locationIdPromise} />
    </Suspense>
  );
};
export default Page;
