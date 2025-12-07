"use client";

import { usePreloadedQuery } from "convex/react";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useMemo } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { WithPreloadedLocations } from "./types";
import { flagImageUrl } from "./utils";

type Props = WithPreloadedLocations;

export function LocationList(props: Props) {
  const locations = usePreloadedQuery(props.preloadedLocations);
  const [country] = useQueryState("country");
  const searchParams = useSearchParams();

  const filteredCountries = useMemo(() => {
    if (!country) {
      return locations;
    }
    return locations.filter((location) => location.countryCode === country);
  }, [country, locations]);

  // render `locations`...
  return (
    <ScrollArea className="h-[70vh] px-3">
      <ItemGroup className="max-w-md">
        {filteredCountries.map((location, index) => (
          <React.Fragment key={location._id}>
            <Item asChild>
              <Link
                href={{
                  query: searchParams.toString(),
                  pathname: `/locations/${location._id}`,
                }}
              >
                {location.imageId && location.image ? (
                  <ItemMedia variant="image" className="relative">
                    <Image
                      src={location.image}
                      alt={location.title}
                      width={80}
                      height={80}
                      quality={100}
                      className="object-cover"
                    />
                  </ItemMedia>
                ) : (
                  <ItemMedia variant="icon">
                    <MapPinIcon className="text-primary" />
                  </ItemMedia>
                )}
                <ItemContent>
                  <ItemTitle>
                    <Image
                      src={flagImageUrl(location.countryCode)}
                      alt={location.countryCode}
                      width={16}
                      height={16}
                    />
                    {location.title}
                  </ItemTitle>
                  <ItemDescription>
                    {location.lat}, {location.long}
                  </ItemDescription>
                </ItemContent>
              </Link>
            </Item>

            {index !== locations.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </ScrollArea>
  );
}
