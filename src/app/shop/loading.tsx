export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
      <div className="skeleton h-3 w-32 rounded-sm" />
      <div className="skeleton mt-6 h-14 w-72 rounded-sm" />
      <div className="skeleton mt-4 h-4 w-96 max-w-full rounded-sm" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-6 lg:block">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-3 w-20 rounded-sm" />
              <div className="skeleton h-4 w-32 rounded-sm" />
              <div className="skeleton h-4 w-28 rounded-sm" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[4/5] rounded-sm" />
              <div className="skeleton mt-4 h-3 w-16 rounded-sm" />
              <div className="skeleton mt-2 h-5 w-40 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
