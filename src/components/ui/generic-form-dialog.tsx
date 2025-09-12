"use client";

import { ReactNode, useEffect } from "react";
import {
  useForm,
  UseFormReturn,
  Resolver,
  type FieldValues,
  type DefaultValues,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type GenericFormDialogProps<
  TSchema extends z.ZodObject<any, any>,
  TValues extends FieldValues = z.infer<TSchema>
> = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  schema: TSchema;
  defaultValues: DefaultValues<TValues>;
  onSubmit: (
    values: TValues,
    form: UseFormReturn<TValues>
  ) => void | Promise<void>;
  render: (form: UseFormReturn<TValues>) => ReactNode;
  submitLabel?: string;
  trigger?: ReactNode;
  resetOnClose?: boolean;
};

export function GenericFormDialog<
  TSchema extends z.ZodObject<any, any>,
  TValues extends FieldValues = z.infer<TSchema>
>({
  open,
  onOpenChange,
  title,
  description,
  schema,
  defaultValues,
  onSubmit,
  render,
  submitLabel = "Speichern",
  trigger,
  resetOnClose = true,
}: GenericFormDialogProps<TSchema, TValues>) {
  const resolver = zodResolver(
    schema as unknown as z.ZodObject<any, any>
  ) as Resolver<TValues>;
  const form = useForm<TValues>({
    resolver,
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!open && resetOnClose) form.reset(defaultValues);
  }, [open, resetOnClose, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        {title || description ? (
          <DialogHeader>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>
        ) : null}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values, form);
            })}
            className="space-y-4"
          >
            {render(form)}
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
