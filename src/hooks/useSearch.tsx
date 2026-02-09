"use client";

import { useState } from "react";

export interface SearchResult {
  lat: number;
  lng: number;
  displayName: string;
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  addresstype: string;
  name: string;
  place_id: number;
}

export default function useSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchText.trim()) return;
    umami.track("search");

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          searchText
        )}&limit=2&countrycodes=it&featureType=city,settlement`,
        {
          headers: {
            "User-Agent":
              "fontanelle/0.1.0 (https://github.com/matitalatina/fontanelle)",
            "Accept-Language": "it-IT,it;q=0.9,en;q=0.8",
          },
        }
      );
      const json: NominatimResult[] = await response.json();
      const data = json.filter((i) => i.addresstype !== "county");

      if (data && data.length > 0) {
        setSearchResult({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name,
        });
        setError(null);
      } else {
        setSearchResult(null);
        setError("Nessun risultato trovato");
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResult(null);
      setError("Errore durante la ricerca");
    } finally {
      setLoading(false);
    }
  };

  const updateSearchText = (text: string) => {
    setSearchText(text);
    if (error) setError(null);
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchResult(null);
    setError(null);
  };

  return {
    searchText,
    setSearchText: updateSearchText,
    searchResult,
    setSearchResult,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
}
