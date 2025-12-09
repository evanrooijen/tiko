import { Suspense } from "react";
import LocationAddForm from "../(components)/location-add-form";
import { getCountryCodes } from "../(components)/utils";

const Default = () => {
  const countries = getCountryCodes();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocationAddForm countryCodesPromise={countries} />
    </Suspense>
  );
};
export default Default;
