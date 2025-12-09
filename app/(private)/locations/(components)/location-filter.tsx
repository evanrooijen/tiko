"use client";

import { usePreloadedQuery } from "convex/react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flagImageUrl } from "./utils";

type Props = {
  id: string;
  countries: Array<{ label: string; value: string }>;
};

const LocationFilter = ({ countries, id }: Props) => {
  const [key, setKey] = useState(Date.now());

  const [selectedCountry, setSelectedCountry] = useQueryState("country", {
    shallow: false,
  });

  return (
    <Select
      key={key}
      defaultValue={selectedCountry ?? undefined}
      value={selectedCountry ?? undefined}
      onValueChange={(e) => setSelectedCountry(e)}
    >
      <SelectTrigger id={id} className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Button
            className="w-full text-left"
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedCountry(null);
              setKey(+Date.now());
            }}
          >
            Reset
          </Button>
          <SelectSeparator />
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              <Image
                width={16}
                height={16}
                quality={100}
                src={flagImageUrl(country.value)}
                alt={country.label}
              />
              <span>{country.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default LocationFilter;
