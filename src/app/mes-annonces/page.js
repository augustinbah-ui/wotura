"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { styles, MUTE } from "../../components/styles";
import { useListings } from "../../components/ListingsProvider";
import { useWindowWidth } from "../../components/useWindowWidth";
import ListingCard from "../../components/ListingCard";

export default function MyListingsPage() {
  const { listings } = useListings();
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  const mine = listings.filter((l) => l.mine);

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <p style={styles.eyebrow}>ESPACE PROPRIÉTAIRE</p>
          <h1 style={{ ...styles.h1, fontSize: isDesktop ? 30 : 24 }}>Mes annonces</h1>
        </div>
        <Link href="/publier" style={styles.publishBtn}>
          <Plus size={16} /> Nouvelle annonce
        </Link>
      </div>

      <div style={isDesktop ? styles.gridDesktop : styles.list}>
        {mine.length === 0 && (
          <div style={styles.emptyState}>
            <p style={{ fontSize: 34 }}>🚗</p>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Aucune annonce publiée</p>
            <p style={{ color: MUTE, fontSize: 13, marginBottom: 16 }}>
              Publie ta première voiture pour commencer à recevoir des contacts.
            </p>
            <Link href="/publier" style={styles.primaryBtnSmall}>
              <Plus size={15} /> Publier une annonce
            </Link>
          </div>
        )}
        {mine.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
