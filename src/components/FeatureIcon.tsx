export default function FeatureIcon({
  icon,
  isPresent,
}: {
  icon: string;
  isPresent: boolean | null;
}) {
  if (isPresent === null) {
    return null;
  }

  if (isPresent) {
    return <i className={`${icon}`}></i>;
  }

  return (
    <span className="fa-stack">
      <i className={`fa-stack-1x ${icon}`}></i>
      <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
    </span>
  );
}
