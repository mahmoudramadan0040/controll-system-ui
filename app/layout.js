
import { Inter } from "next/font/google";
import { ReduxProvider } from "./Redux/ReduxProvider";
// import "./globals.css";
import "@/styles/globals.css";
import NavigationBarComponent from "./Components/NavigationBarComponent";
import ProvidersUIComponent from "./Components/ProvidersUIComponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Control Home",
  description: "Controll System For OTU",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      

      <body className={inter.className} >
      <ReduxProvider  >
        <ProvidersUIComponent themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <NavigationBarComponent></NavigationBarComponent>
            {children}
        </ProvidersUIComponent>
        </ReduxProvider>
      </body>
        
      
    </html>
  );
}
