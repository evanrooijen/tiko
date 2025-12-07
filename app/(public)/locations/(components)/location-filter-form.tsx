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

type Props = {
  searchParams: Promise<SearchParams>;
};

const LocationFilterForm = async ({
  searchParams: searchParamsPromise,
}: Props) => {
  const searchParams = await searchParamsPromise;
  const { countryCode } = await loadSearchParams(searchParams);
  const preloadedCountryCodes = await preloadQuery(api.locations.countryCodes);

  return (
    <LocationFilterFormImpl
      countryCode={countryCode}
      preloadedCountryCodes={preloadedCountryCodes}
    />
  );
};

const LocationFilterFormImpl = async ({
  countryCode,
  preloadedCountryCodes,
}: {
  countryCode: string | null;
  preloadedCountryCodes: Awaited<ReturnType<typeof preloadQuery>>;
}) => {
  "use cache";

  const preloadedLocations = await preloadQuery(api.locations.list, {
    ...(countryCode && { countryCode }),
  });

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
              preloadedCountryCodes={preloadedCountryCodes}
            />
          </Field>
        </FieldSet>
      </FieldGroup>
      <LocationList preloadedLocations={preloadedLocations} />
    </div>
  );
};
export default LocationFilterForm;
