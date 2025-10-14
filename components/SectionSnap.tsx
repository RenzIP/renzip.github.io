export default function SectionSnap({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`snap-start snap-always min-h-[calc(100svh-56px)] pt-14 flex items-center ${className}`}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}
