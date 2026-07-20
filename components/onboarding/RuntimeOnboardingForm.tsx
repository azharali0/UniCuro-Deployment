"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: Option[];
  defaultValue?: string | boolean | null;
};

export function RuntimeOnboardingForm({
  stepCode,
  fields,
  submitLabel,
}: {
  stepCode: string;
  fields: Field[];
  submitLabel: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const initialValues = useMemo(() => {
    return Object.fromEntries(
      fields.map((field) => [field.name, field.defaultValue ?? (field.type === "checkbox" ? false : "")])
    );
  }, [fields]);

  async function submit(formData: FormData) {
    setSaving(true);
    setError("");

    const payload: Record<string, string | boolean | number | null> = {};
    for (const field of fields) {
      if (field.type === "checkbox") {
        payload[field.name] = formData.get(field.name) === "on";
      } else {
        payload[field.name] = String(formData.get(field.name) || "");
      }
    }

    const response = await fetch("/api/onboarding/step", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stepCode, payload }),
    });

    const result = await response.json();
    setSaving(false);

    if (!result.ok) {
      setError(result.error || "Unable to save this onboarding step.");
      return;
    }

    router.push(result.nextRoute || "/student");
    router.refresh();
  }

  return (
    <form
      action={submit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-5">
        {fields.map((field) => (
          <label key={field.name} className="grid gap-2 font-bold">
            <span>{field.label}</span>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                required={field.required}
                defaultValue={String(initialValues[field.name] || "")}
                className="min-h-32 rounded-2xl border border-slate-300 p-4"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                required={field.required}
                defaultValue={String(initialValues[field.name] || "")}
                className="rounded-2xl border border-slate-300 p-4"
              >
                <option value="">Select an option</option>
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                name={field.name}
                type="checkbox"
                defaultChecked={Boolean(initialValues[field.name])}
                className="h-6 w-6"
              />
            ) : (
              <input
                name={field.name}
                required={field.required}
                defaultValue={String(initialValues[field.name] || "")}
                className="rounded-2xl border border-slate-300 p-4"
              />
            )}
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 font-bold text-red-700">
          {error}
        </p>
      )}

      <button
        disabled={saving}
        className="mt-6 w-full rounded-2xl bg-emerald-600 px-6 py-4 font-black text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
