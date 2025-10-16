"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Invalid email"),
  business: z.string().min(2, "Tell me about your business"),
  needs: z.array(z.string()).min(1, "Pick at least one"),
  timeframe: z.enum(["asap", "2-4w", "1-2m", "exploring"]),
  notes: z.string().optional(),
  honey: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof FormSchema>;

const NEEDS = [
  { id: "ux", label: "User Experience" },
  { id: "brand", label: "Brand / Identity" },
  { id: "motion", label: "Motion / Interaction" },
  { id: "other", label: "Other" },
];

const TIMES = [
  { id: "asap", label: "ASAP" },
  { id: "2-4w", label: "2 - 4 weeks" },
  { id: "1-2m", label: "1–2 months" },
  { id: "exploring", label: "Just exploring" },
];

export default function HireForm() {
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      needs: [],
      timeframe: "asap",
      notes: "",
      honey: "",
    },
  });
  const { errors, isSubmitting } = formState;

  async function onSubmit(values: FormValues) {
    setSent(null);
    const res = await fetch("/api/hire", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSent("ok");
      reset();
    } else {
      setSent("err");
    }
  }

  const selectedNeeds = watch("needs");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* YOUR INFO */}
      <section>
        <h3 className="text-lg font-extrabold tracking-wide">YOUR INFO</h3>
        <div className="mt-4 space-y-6">
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              {...register("name")}
              className="mt-1 w-full bg-transparent border-b py-2 outline-none"
              placeholder="Name"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full bg-transparent border-b py-2 outline-none"
              placeholder="Email"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </label>
        </div>
      </section>

      {/* YOUR BUSINESS */}
      <section>
        <h3 className="text-lg font-extrabold tracking-wide">YOUR BUSINESS</h3>
        <label className="block mt-4">
          <span className="text-sm">What do you do?</span>
          <input
            {...register("business")}
            className="mt-1 w-full bg-transparent border-b py-2 outline-none"
            placeholder="What do you do?"
          />
          {errors.business && (
            <p className="text-xs text-destructive mt-1">{errors.business.message}</p>
          )}
        </label>
      </section>

      {/* NEEDS */}
      <section>
        <h3 className="text-lg font-extrabold tracking-wide">WHAT NEEDS TO BE DONE?</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEEDS.map((n) => (
            <label
              key={n.id}
              className="flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/40"
            >
              <input
                type="checkbox"
                checked={selectedNeeds.includes(n.label)}
                onChange={(e) => {
                  const next = new Set(selectedNeeds);
                  e.target.checked ? next.add(n.label) : next.delete(n.label);
                  setValue("needs", Array.from(next));
                }}
              />
              <span>({n.label})</span>
            </label>
          ))}
        </div>
        {errors.needs && <p className="text-xs text-destructive mt-1">{errors.needs.message}</p>}
      </section>

      {/* TIMEFRAME */}
      <section>
        <h3 className="text-lg font-extrabold tracking-wide">IDEAL TIMEFRAME</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIMES.map((t) => (
            <label
              key={t.id}
              className="flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/40"
            >
              <input {...register("timeframe")} type="radio" value={t.id} />
              <span>({t.label})</span>
            </label>
          ))}
        </div>
      </section>

      {/* NOTES */}
      <section>
        <h3 className="text-lg font-extrabold tracking-wide">ANYTHING ELSE I NEED TO KNOW?</h3>
        <textarea
          {...register("notes")}
          rows={4}
          placeholder="Type here"
          className="mt-4 w-full rounded-md border bg-transparent p-3 outline-none"
        />
      </section>

      {/* honeypot (hidden) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("honey")}
      />

      {/* SUBMIT */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border bg-foreground text-background py-3 font-bold tracking-wide hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "SENDING..." : "SUBMIT"}
        </button>

        {sent === "ok" && (
          <p className="mt-3 text-sm text-green-500">Thanks! I’ll reply via email soon.</p>
        )}
        {sent === "err" && (
          <p className="mt-3 text-sm text-destructive">
            Sorry, something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
