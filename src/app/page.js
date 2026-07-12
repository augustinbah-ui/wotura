"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { styles, ORANGE, MUTE } from "../components/styles";
import { useListings } from "../components/ListingsProvider";
import { useWindowWidth } from "../components/useWindowWidth";
import ListingCard from "../components/ListingCard";

export default function HomePage() {
  const { listings } = useListings();
  const [query, setQuery] = useState("");
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  const filtered = listings.filter((l) =>
    (l.ville + l.title + l.quartier).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>LOCATION ENTRE PARTICULIERS</p>
        <h1 style={{ ...styles.h1, fontSize: isDesktop ? 40 : 28 }}>
          Trouve ta voiture,{" "}
          <span style={{ color: ORANGE }}>où que tu sois.</span>
        </h1>
        <p style={styles.heroSub}>
          Parcours les annonces publiées près de chez toi et contacte directement le
          propriétaire, par appel ou WhatsApp.
        </p>

        <div style={styles.searchBar}>
          <Search size={18} color={MUTE} />
          <input
            placeholder="Ville, quartier ou modèle de voiture…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </section>

      <div style={styles.resultsHeader}>
        <p style={styles.resultCount}>
          {filtered.length} voiture{filtered.length > 1 ? "s" : ""} disponible
          {filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      <div style={isDesktop ? styles.gridDesktop : styles.list}>
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
        {filtered.length === 0 && (
          <div style={styles.emptyState}>
            <p style={{ fontSize: 34 }}>🔍</p>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Aucun résultat</p>
            <p style={{ color: MUTE, fontSize: 13 }}>Essaie une autre ville ou un autre modèle.</p>
          </div>
        )}
      </div>
    </div>
  );
}
