import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import L from "leaflet";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (e?: React.FormEvent) => void;
  loading: boolean;
  error?: string | null;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  loading,
  error,
}: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      L.DomEvent.disableClickPropagation(formRef.current);
      L.DomEvent.disableScrollPropagation(formRef.current);
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onSearch}
      className={`join w-full max-w-[calc(100vw-(var(--spacing)*14+2rem)*2)] sm:max-w-md shadow-lg pointer-events-auto tooltip tooltip-bottom ${error ? "tooltip-open tooltip-warning" : ""}`}
      data-tip={error}
    >
      <input
        type="text"
        className="input input-bordered join-item w-full bg-base-100"
        placeholder="Cerca un luogo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary join-item disabled:bg-primary/50 disabled:text-primary-content/50 backdrop-blur-xs"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </button>
    </form>
  );
}
