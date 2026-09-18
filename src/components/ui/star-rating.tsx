type Props = {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  count?: number;
};

function Star({ fill, size }: { fill: number; size: number }) {
  const id = `star-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.6 6 20.9l1.3-6.7-5-4.7 6.8-.8L12 2.5z"
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarRating({ rating, size = 14, className = "", showValue = false, count }: Props) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-gold ${className}`}>
      <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={size} fill={Math.max(0, Math.min(1, rating - i))} />
        ))}
      </span>
      {showValue && <span className="text-xs font-medium text-ink">{rating.toFixed(1)}</span>}
      {count != null && <span className="text-xs text-stone">({count})</span>}
    </span>
  );
}
