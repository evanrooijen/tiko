import { preloadQuery } from "convex/nextjs";
import type { SearchParams } from "nuqs/server";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { api } from "@/convex/_generated/api";
import LocationFilter from "./location-filter";
import { LocationList } from "./location-list";
import { loadSearchParams } from "./searchParams";
import { getCountryCodes } from "./utils";

type Props = {
  searchParams: Promise<SearchParams>;
};

const LocationFilterForm = async ({
  searchParams: searchParamsPromise,
}: Props) => {
  const searchParams = await searchParamsPromise;
  const { countryCode } = await loadSearchParams(searchParams);
  const countryCodes = await getCountryCodes();

  return (
    <LocationFilterFormImpl
      countryCode={countryCode}
      countryCodes={countryCodes}
    />
  );
};

const LocationFilterFormImpl = async ({
  countryCode,
  countryCodes,
}: {
  countryCode: string | null;
  countryCodes: Awaited<ReturnType<typeof getCountryCodes>>;
}) => {
  "use cache";

  const preloadedLocations = await preloadQuery(api.locations.list, {
    ...(countryCode && { countryCode }),
  });

  const { data } = countryCodes;

  return (
    <div className="max-w-md flex flex-col gap-4">
      <FieldGroup>
        <FieldSet>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <FieldDescription>Filter locations by country</FieldDescription>
            </FieldContent>
            <LocationFilter
              id="country"
              countries={
                data?.map((c) => ({
                  label: c.name.common,
                  value: c.cca2,
                })) || []
              }
            />
          </Field>
        </FieldSet>
      </FieldGroup>
      <LocationList preloadedLocations={preloadedLocations} />
    </div>
  );
};
export default LocationFilterForm;
