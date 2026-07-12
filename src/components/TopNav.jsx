"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { styles, ORANGE, INK } from "./styles";
import { useWindowWidth } from "./useWindowWidth";

const navItems = [
  { href: "/", label: "Annonces" },
  { href: "/mes-annonces", label: "Mes annonces" },
  { href: "/profil", label: "Profil" },
];

export default function TopNav() {
  const pathname = usePathname();
  const width = useWindowWidth();
  const isDesktop = width >= 900;
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.topNav}>
      <div style={styles.topNavInner}>
        <Link href="/" style={styles.brand}>
          <span style={styles.brandMark}>W</span>
          <span style={styles.brandName}>Wotura</span>
        </Link>

        {isDesktop && (
          <>
            <nav style={styles.navLinks}>
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  style={{
                    ...styles.navLink,
                    color: pathname === n.href ? ORANGE : INK,
                  }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/publier" style={styles.publishBtn}>
              <Plus size={16} /> Publier une annonce
            </Link>
          </>
        )}

        {!isDesktop && (
          <button style={styles.menuBtn} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {!isDesktop && open && (
        <div style={styles.mobileMenu}>
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ ...styles.navLink, display: "block", padding: "10px 0", color: pathname === n.href ? ORANGE : INK }}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/publier" style={{ ...styles.mobileMenuPublish, marginTop: 8 }} onClick={() => setOpen(false)}>
            <Plus size={16} /> Publier une annonce
          </Link>
        </div>
      )}
    </header>
  );
}
