"use client";

import { usePreloadedQuery } from "convex/react";
import type { WithPreloadedLocation } from "./types";

type Props = WithPreloadedLocation;

const LocationDetail = ({ preloadedLocation }: Props) => {
  const location = usePreloadedQuery(preloadedLocation);

  if (!location) {
    return <span>Select a location</span>;
  }

  return (
    <div>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};
export default LocationDetail;
