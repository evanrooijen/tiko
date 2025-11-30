"use client";

import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import {
  type FormEvent,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const LocationImageForm = () => {
  const generateUploadUrl = useMutation(api.locations.generateUploadUrl);
  const sendImage = useMutation(api.locations.setLocationImage);
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const [locationId] = useQueryState("location");
  const location = useQuery(
    api.locations.get,
    !locationId
      ? "skip"
      : {
          id: locationId as Id<"locations">,
        },
  );

  const handleImageUpload = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedImage || !location) {
        return;
      }
      startTransition(async () => {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
        });
        const { storageId } = await result.json();
        // Step 3: Save the newly allocated storage id to the database
        await sendImage({
          storageId,
          locationId: location._id,
        });

        setSelectedImage(null);
        if (imageInput.current) {
          imageInput.current.value = "";
        }
      });
    },
    [selectedImage, location, sendImage, generateUploadUrl],
  );

  if (!location || !locationId) {
    return <span>Select a location</span>;
  }

  return (
    <form
      className="flex flex-col w-full max-w-sm gap-3"
      onSubmit={handleImageUpload}
    >
      <FieldSet>
        <FieldLegend>{location.title}</FieldLegend>
        <FieldDescription>Upload an image for this location</FieldDescription>

        <FieldGroup>
          <div className="w-full relative h-40 rounded-lg overflow-hidden">
            {location.image ? (
              <Image
                src={location.image}
                alt={location.title}
                fill
                quality={100}
                objectFit="cover"
              />
            ) : (
              <div className="inset-0 rounded-lg bg-accent absolute flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </FieldGroup>
        <FieldSeparator />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="picture">Picture</FieldLabel>
            <Input
              id="picture"
              type="file"
              ref={imageInput}
              accept="image/*"
              required
              disabled={isPending}
              onChange={(event) => setSelectedImage(event.target.files![0])}
            />
            <FieldDescription>
              The image to use with this location
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button type="submit" variant="default" disabled={isPending}>
        Upload
      </Button>
    </form>
  );
};
export default LocationImageForm;
