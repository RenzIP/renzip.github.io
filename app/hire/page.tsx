import HireForm from "@/components/HireForm";

export const metadata = {
  title: "Hire Me • Renz",
  description: "Work with me — tell me about your project.",
};

export default function HirePage() {
  return (
    <main className="min-h-[100svh]">
      <section className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold">Hire Me</h1>
        <p className="text-muted-foreground mt-2">
          Tell me about your business and what you need. I’ll get back ASAP.
        </p>

        <div className="mt-8 rounded-2xl border p-6 md:p-8 bg-background">
          <HireForm />
        </div>
      </section>
    </main>
  );
}
