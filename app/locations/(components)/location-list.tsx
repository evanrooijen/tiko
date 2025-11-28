"use client";

import { type Preloaded, usePreloadedQuery } from "convex/react";
import { MapPinIcon } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import type { api } from "@/convex/_generated/api";

export function LocationList(props: {
  preloadedLocations: Preloaded<typeof api.locations.list>;
}) {
  const locations = usePreloadedQuery(props.preloadedLocations);
  // render `locations`...
  return (
    <ItemGroup>
      {locations.map((location, index) => (
        <React.Fragment key={location._id}>
          <Item>
            <ItemMedia variant="icon">
              <MapPinIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{location.title}</ItemTitle>
              <ItemDescription>
                {location.lat}, {location.long}
              </ItemDescription>
            </ItemContent>
          </Item>
          {index !== locations.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
