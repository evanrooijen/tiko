/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { use, useMemo } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import type { getCountryCodes } from "./utils";

const compareCountryCode = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  countryCode: z.string(),
  lat: z.coerce.number<string>().min(-90).max(90),
  long: z.coerce.number<string>().min(-180).max(180),
});

const LocationAddForm = ({
  countryCodesPromise,
}: {
  countryCodesPromise: ReturnType<typeof getCountryCodes>;
}) => {
  const mutate = useMutation(api.locations.add);
  const { data: countries } = use(countryCodesPromise);

  const sortedCountries = useMemo(() => {
    return countries
      ?.toSorted((a, b) => compareCountryCode(a.cca2, b.cca2))
      .map(({ name, cca2 }) => ({
        value: cca2,
        label: name.common,
      }));
  }, [countries]);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      countryCode: "",
      lat: "",
      long: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const data = formSchema.parse(value);
      await mutate(data);
      form.reset();
    },
  });

  return (
    <form
      className="max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldLegend>Location</FieldLegend>
        <FieldDescription>Add a new location</FieldDescription>
        <FieldGroup>
          <form.Field
            name="title"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  <FieldDescription>Title of the location</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Description of the location
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="countryCode"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} orientation={"responsive"}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                    <FieldDescription>Country of the location</FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger
                      id="form-tanstack-select-language"
                      aria-invalid={isInvalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                      <SelectContent position="item-aligned">
                        {sortedCountries?.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </Field>
              );
            }}
          />
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="lat"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Latitude</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Latitude of the location
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="long"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Longitude</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="text"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Longitude of the location
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <Button type="submit">Add Location</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default LocationAddForm;
