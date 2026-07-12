"use client";
import { useState } from "react";
import { styles, INK } from "../../components/styles";
import { useWindowWidth } from "../../components/useWindowWidth";

function SettingRow({ label }) {
  return (
    <div style={styles.settingRow}>
      <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{label}</span>
      <span style={{ color: "#c9bdae" }}>›</span>
    </div>
  );
}

export default function ProfilePage() {
  const [role, setRole] = useState("locataire");
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  return (
    <div style={{ ...styles.page, maxWidth: 560 }}>
      <p style={styles.eyebrow}>COMPTE</p>
      <h1 style={{ ...styles.h1, fontSize: isDesktop ? 30 : 24, marginBottom: 20 }}>Mon profil</h1>

      <div style={styles.profileCard}>
        <div style={styles.avatarBig}>M</div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 16 }}>Mon Compte</p>
          <p style={{ margin: 0, fontSize: 12, color: "#8a7d6f" }}>Membre depuis Juillet 2026</p>
        </div>
      </div>

      <p style={styles.sectionTitle}>Je me connecte en tant que</p>
      <div style={styles.roleToggle}>
        <button
          style={{ ...styles.roleBtn, ...(role === "locataire" ? styles.roleBtnActive : {}) }}
          onClick={() => setRole("locataire")}
        >
          Locataire
        </button>
        <button
          style={{ ...styles.roleBtn, ...(role === "proprietaire" ? styles.roleBtnActive : {}) }}
          onClick={() => setRole("proprietaire")}
        >
          Propriétaire
        </button>
      </div>

      <p style={styles.sectionTitle}>Paramètres</p>
      <SettingRow label="Notifications" />
      <SettingRow label="Confidentialité" />
      <SettingRow label="Aide & support" />
      <SettingRow label="À propos de Wotura" />
    </div>
  );
}
