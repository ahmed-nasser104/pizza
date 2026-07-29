export default function StatusBadge({ status, variant = "default" }) {
  const variants = {
    default: "badge-neutral",
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
    danger: "badge-error",
  };

  return (
    <span className={`badge ${variants[variant] || variants.default}`}>
      {status}
    </span>
  );
}
