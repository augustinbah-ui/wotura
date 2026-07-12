import Link from "next/link";
import { MapPin, Fuel, Settings2, Star } from "lucide-react";
import { styles, ORANGE, MUTE } from "./styles";
import { currency } from "../data/listings";

export default function ListingCard({ listing }) {
  return (
    <Link href={`/annonce/${listing.id}`} style={styles.card}>
      <div style={styles.cardEmoji}>{listing.photos[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <p style={styles.cardTitle}>{listing.title}</p>
          <p style={styles.cardPrice}>
            {currency(listing.prix)}
            <span style={{ fontWeight: 400, color: MUTE, fontSize: 11 }}>/jour</span>
          </p>
        </div>
        <div style={styles.cardMeta}>
          <MapPin size={12} color={ORANGE} />
          <span>{listing.quartier}, {listing.ville}</span>
        </div>
        <div style={styles.cardTags}>
          <span style={styles.tag}><Fuel size={11} /> {listing.carburant}</span>
          <span style={styles.tag}><Settings2 size={11} /> {listing.boite}</span>
          <span style={styles.tagStar}><Star size={11} fill={ORANGE} color={ORANGE} /> {listing.note || "Nouveau"}</span>
        </div>
      </div>
    </Link>
  );
}
