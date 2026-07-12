import { ListingsProvider } from "../components/ListingsProvider";
import { ToastProvider } from "../components/ToastProvider";
import TopNav from "../components/TopNav";
import TabBar from "../components/TabBar";
import { styles } from "../components/styles";

export const metadata = {
  title: "Wotura — Location de voiture entre particuliers",
  description:
    "Trouve une voiture à louer près de chez toi ou publie ton véhicule. Contact direct par appel ou WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <ListingsProvider>
          <ToastProvider>
            <div style={styles.appShell}>
              <TopNav />
              <main style={styles.main}>{children}</main>
              <TabBar />
            </div>
          </ToastProvider>
        </ListingsProvider>
      </body>
    </html>
  );
}
