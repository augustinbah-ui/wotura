"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Check } from "lucide-react";
import { styles, ORANGE, MUTE, INK } from "../../components/styles";
import { useListings } from "../../components/ListingsProvider";
import { useToast } from "../../components/ToastProvider";
import { useWindowWidth } from "../../components/useWindowWidth";

function Field({ label, children, style }) {
  return (
    <div style={{ marginBottom: 14, ...style }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function PublishPage() {
  const router = useRouter();
  const { addListing } = useListings();
  const { showToast } = useToast();
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  const [form, setForm] = useState({
    title: "",
    ville: "",
    quartier: "",
    prix: "",
    carburant: "Essence",
    boite: "Manuelle",
    tel: "",
    whatsapp: "",
    description: "",
    conditionsLongueDuree: "",
    depotGarantie: false,
    montantDepot: "",
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit() {
    if (!form.title || !form.ville || !form.prix || !form.tel) return;
    addListing({
      ...form,
      prix: Number(form.prix),
      montantDepot: form.depotGarantie ? Number(form.montantDepot) || 0 : null,
      photos: ["🚗"],
      proprietaire: "Moi",
      note: 0,
      avis: 0,
    });
    showToast("Annonce publiée ✓");
    router.push("/mes-annonces");
  }

  const canSubmit = form.title && form.ville && form.prix && form.tel;

  return (
    <div style={{ ...styles.page, maxWidth: 640 }}>
      <button style={styles.backLink} onClick={() => router.push("/")}>
        <ChevronLeft size={18} /> Annuler
      </button>

      <h1 style={{ ...styles.h1, fontSize: 26, marginBottom: 4 }}>Publier une annonce</h1>
      <p style={{ color: MUTE, fontSize: 13.5, marginBottom: 24 }}>
        Renseigne les informations de ton véhicule pour que les locataires puissent te contacter.
      </p>

      <div style={styles.formCard}>
        <div style={styles.photoPicker}>
          <Plus size={22} color={ORANGE} />
          <span style={{ fontSize: 12, fontWeight: 600, color: ORANGE }}>Ajouter des photos</span>
        </div>

        <Field label="Titre de l'annonce">
          <input style={styles.input} placeholder="Ex : Toyota Corolla 2019" value={form.title} onChange={(e) => set("title", e.target.value)} />
        </Field>

        <div style={{ display: "flex", gap: 10, flexWrap: isDesktop ? "nowrap" : "wrap" }}>
          <Field label="Ville" style={{ flex: 1, minWidth: 140 }}>
            <input style={styles.input} placeholder="Ex : Abidjan" value={form.ville} onChange={(e) => set("ville", e.target.value)} />
          </Field>
          <Field label="Quartier" style={{ flex: 1, minWidth: 140 }}>
            <input style={styles.input} placeholder="Ex : Cocody" value={form.quartier} onChange={(e) => set("quartier", e.target.value)} />
          </Field>
        </div>

        <Field label="Prix par jour (FCFA)">
          <input style={styles.input} type="number" placeholder="25000" value={form.prix} onChange={(e) => set("prix", e.target.value)} />
        </Field>

        <div style={{ display: "flex", gap: 10, flexWrap: isDesktop ? "nowrap" : "wrap" }}>
          <Field label="Carburant" style={{ flex: 1, minWidth: 140 }}>
            <select style={styles.input} value={form.carburant} onChange={(e) => set("carburant", e.target.value)}>
              <option>Essence</option>
              <option>Diesel</option>
              <option>Hybride</option>
              <option>Électrique</option>
            </select>
          </Field>
          <Field label="Boîte" style={{ flex: 1, minWidth: 140 }}>
            <select style={styles.input} value={form.boite} onChange={(e) => set("boite", e.target.value)}>
              <option>Manuelle</option>
              <option>Automatique</option>
            </select>
          </Field>
        </div>

        <Field label="Description">
          <textarea style={{ ...styles.input, height: 80, resize: "none" }} placeholder="État du véhicule, équipements…" value={form.description} onChange={(e) => set("description", e.target.value)} />
        </Field>

        <p style={styles.sectionTitle}>Conditions de location</p>

        <Field label="Conditions longue durée (optionnel)">
          <textarea
            style={{ ...styles.input, height: 64, resize: "none" }}
            placeholder="Ex : -10% à partir de 7 jours, -20% à partir d'un mois…"
            value={form.conditionsLongueDuree}
            onChange={(e) => set("conditionsLongueDuree", e.target.value)}
          />
        </Field>

        <label style={styles.checkboxRow}>
          <input type="checkbox" checked={form.depotGarantie} onChange={(e) => set("depotGarantie", e.target.checked)} style={styles.checkbox} />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>Dépôt de garantie exigé</span>
        </label>

        {form.depotGarantie && (
          <Field label="Montant du dépôt (FCFA)">
            <input style={styles.input} type="number" placeholder="50000" value={form.montantDepot} onChange={(e) => set("montantDepot", e.target.value)} />
          </Field>
        )}

        <p style={styles.sectionTitle}>Coordonnées de contact</p>
        <div style={{ display: "flex", gap: 10, flexWrap: isDesktop ? "nowrap" : "wrap" }}>
          <Field label="Numéro d'appel" style={{ flex: 1, minWidth: 160 }}>
            <input style={styles.input} placeholder="+225 07 00 00 00" value={form.tel} onChange={(e) => set("tel", e.target.value)} />
          </Field>
          <Field label="Numéro WhatsApp" style={{ flex: 1, minWidth: 160 }}>
            <input style={styles.input} placeholder="+225 07 00 00 00" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
          </Field>
        </div>

        <button style={{ ...styles.primaryBtn, opacity: canSubmit ? 1 : 0.4, marginTop: 8 }} disabled={!canSubmit} onClick={submit}>
          <Check size={17} /> Publier l'annonce
        </button>
      </div>
    </div>
  );
}
