"use client";

import {
  projectDefaultValues,
  ProjectFormValues,
  projectSchema,
  renderProjectFields,
} from "@/components/forms/project-form";
import { Button } from "@/components/ui/button";
import { GenericFormDialog } from "@/components/ui/generic-form-dialog";
import { useState } from "react";

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: ProjectFormValues) {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <GenericFormDialog
        open={open}
        onOpenChange={setOpen}
        title="Neues Projekt"
        description="Projekt anlegen"
        schema={projectSchema}
        defaultValues={projectDefaultValues}
        onSubmit={handleSubmit}
        submitLabel="Anlegen"
        trigger={<Button onClick={() => setOpen(true)}>Projekt anlegen</Button>}
        render={renderProjectFields}
      />
    </div>
  );
}
