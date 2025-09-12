"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2).max(100),
  key: z.string().regex(/^[A-Z0-9_-]{2,16}$/),
  description: z.string().max(500).optional().or(z.literal("")),
  isPrivate: z.boolean().default(true),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const projectDefaultValues: ProjectFormValues = {
  name: "",
  key: "",
  description: "",
  isPrivate: true,
};

export function renderProjectFields(form: UseFormReturn<ProjectFormValues>) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Projektname" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key</FormLabel>
            <FormControl>
              <Input placeholder="TECH" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beschreibung</FormLabel>
            <FormControl>
              <Textarea placeholder="Optional" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isPrivate"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            </FormControl>
            <FormLabel>Privat</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
