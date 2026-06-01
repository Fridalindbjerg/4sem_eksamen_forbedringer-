export default function ProductsContentSkeleton() {
  return (
    <section className="section content">
      <div className="h-12 w-48 bg-neutral-200 animate-pulse rounded" />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 pt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="flex flex-col gap-4">
            <div className="h-4 w-16 bg-neutral-200 animate-pulse rounded" />
            <div className="h-4 w-32 bg-neutral-200 animate-pulse rounded" />
            <div className="aspect-square bg-neutral-200 animate-pulse rounded" />
          </li>
        ))}
      </ul>
    </section>
  );
}
