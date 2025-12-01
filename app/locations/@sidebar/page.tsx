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
import LocationFilter from "../(components)/location-filter";
import { LocationList } from "../(components)/location-list";
import { loadSearchParams } from "../(components)/searchParams";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await loadSearchParams(searchParams);

  const preloadedLocations = await preloadQuery(api.locations.list, {
    ...(params.countryCode && { countryCode: params.countryCode }),
  });
  const preloadedCountryCodes = await preloadQuery(api.locations.countryCodes);

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
export default Page;
