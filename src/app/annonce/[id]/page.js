"use client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Phone, MessageCircle, Fuel, Settings2, Star, Calendar, ShieldCheck } from "lucide-react";
import { styles, ORANGE, MUTE, INK } from "../../../components/styles";
import { useListings } from "../../../components/ListingsProvider";
import { useToast } from "../../../components/ToastProvider";
import { useWindowWidth } from "../../../components/useWindowWidth";
import { currency } from "../../../data/listings";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { listings } = useListings();
  const { showToast } = useToast();
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  const listing = listings.find((l) => String(l.id) === String(id));

  if (!listing) {
    return (
      <div style={styles.page}>
        <p>Annonce introuvable.</p>
        <button style={styles.backLink} onClick={() => router.push("/")}>
          <ChevronLeft size={18} /> Retour aux annonces
        </button>
      </div>
    );
  }

  const callHref = `tel:${listing.tel.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${listing.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div style={{ ...styles.page, maxWidth: 880 }}>
      <button style={styles.backLink} onClick={() => router.push("/")}>
        <ChevronLeft size={18} /> Retour aux annonces
      </button>

      <div style={{ display: "flex", flexDirection: isDesktop ? "row" : "column", gap: 28 }}>
        <div style={{ flex: isDesktop ? "0 0 320px" : "auto" }}>
          <div style={styles.heroPhoto}>{listing.photos[0]}</div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK }}>{listing.title}</h2>
              <div style={styles.cardMeta}>
                <MapPin size={14} color={ORANGE} />
                <span>{listing.quartier}, {listing.ville}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: ORANGE }}>{currency(listing.prix)}</p>
              <p style={{ margin: 0, fontSize: 12, color: MUTE }}>par jour</p>
            </div>
          </div>

          <div style={styles.specRow}>
            <div style={styles.specBox}><Fuel size={16} color={ORANGE} /><span>{listing.carburant}</span></div>
            <div style={styles.specBox}><Settings2 size={16} color={ORANGE} /><span>{listing.boite}</span></div>
            <div style={styles.specBox}><Star size={16} color={ORANGE} fill={ORANGE} /><span>{listing.note || "—"} ({listing.avis || 0})</span></div>
          </div>

          <h3 style={styles.sectionTitle}>Description</h3>
          <p style={styles.paragraph}>{listing.description}</p>

          {(listing.conditionsLongueDuree || listing.depotGarantie) && (
            <>
              <h3 style={styles.sectionTitle}>Conditions de location</h3>
              <div style={styles.conditionsBox}>
                {listing.conditionsLongueDuree && (
                  <div style={styles.conditionRow}>
                    <Calendar size={15} color={ORANGE} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <p style={styles.conditionLabel}>Longue durée</p>
                      <p style={styles.conditionText}>{listing.conditionsLongueDuree}</p>
                    </div>
                  </div>
                )}
                <div style={styles.conditionRow}>
                  <ShieldCheck size={15} color={ORANGE} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={styles.conditionLabel}>Dépôt de garantie</p>
                    <p style={styles.conditionText}>
                      {listing.depotGarantie ? `Exigé — ${currency(listing.montantDepot)}` : "Aucun dépôt exigé"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <h3 style={styles.sectionTitle}>Propriétaire</h3>
          <div style={styles.ownerRow}>
            <div style={styles.avatar}>{listing.proprietaire.charAt(0)}</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{listing.proprietaire}</p>
              <p style={{ margin: 0, fontSize: 12, color: MUTE }}>Répond généralement en 30 min</p>
            </div>
          </div>

          <div style={styles.contactRow}>
            <a
              href={callHref}
              style={{ ...styles.contactBtn, ...styles.contactBtnOutline }}
              onClick={() => showToast("Ouverture de l'appel…")}
            >
              <Phone size={17} /> Appeler
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.contactBtn, ...styles.contactBtnFill }}
              onClick={() => showToast("Ouverture de WhatsApp…")}
            >
              <MessageCircle size={17} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
