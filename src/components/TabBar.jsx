"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, User } from "lucide-react";
import { styles, ORANGE } from "./styles";
import { useWindowWidth } from "./useWindowWidth";

const tabs = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/mes-annonces", label: "Mes annonces", icon: ListChecks },
  { href: "/profil", label: "Profil", icon: User },
];

export default function TabBar() {
  const pathname = usePathname();
  const width = useWindowWidth();
  const isDesktop = width >= 900;

  // La barre d'onglets ne s'affiche que sur les pages "liste", pas sur détail/publier
  const hiddenOn = ["/publier"];
  const isDetail = pathname.startsWith("/annonce/");

  if (isDesktop || hiddenOn.includes(pathname) || isDetail) return null;

  return (
    <div style={styles.tabBar}>
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} style={styles.tabBtn}>
            <Icon size={20} color={active ? ORANGE : "#a89a89"} />
            <span style={{ fontSize: 10, fontWeight: 700, color: active ? ORANGE : "#a89a89" }}>
              {t.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
