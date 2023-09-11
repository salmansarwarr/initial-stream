import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./redux/providers";
import { getCurrencyNames, getCurrenyData } from "./api";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Initial Stream",
    description: "Live rates for Netflix",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currencyData: any = await getCurrenyData();
    const currencies: string[] = Object.keys(currencyData.rates);
    const currrNames: any = getCurrencyNames();
    
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-300`}>
                <Providers>
                    <Navbar currencies={currencies} currencyData={currrNames} />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
