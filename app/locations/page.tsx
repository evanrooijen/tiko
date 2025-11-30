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
import LocationFilter from "./(components)/location-filter";
import { LocationList } from "./(components)/location-list";
import { loadSearchParams } from "./(components)/searchParams";

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
    <div className="py-10 px-2 sm:px-6 lg:px-8">
      <main className="container mx-auto flex flex-col gap-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Locations
        </h1>
        <div className="max-w-md">
          <FieldGroup>
            <FieldSet>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <FieldDescription>
                    Filter locations by country
                  </FieldDescription>
                </FieldContent>
                <LocationFilter
                  id="country"
                  preloadedCountryCodes={preloadedCountryCodes}
                />
              </Field>
            </FieldSet>
          </FieldGroup>
        </div>
        <LocationList preloadedLocations={preloadedLocations} />
      </main>
    </div>
  );
};
export default Page;
