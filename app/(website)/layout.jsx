import { Geist, Geist_Mono, Lato, Courgette } from "next/font/google";
import Header from './Components/Header'
import Footer from './Components/Footer'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const latoSans = Lato({
    variable: "--font-lato-sans",
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"], // required
});

const courgette = Courgette({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomeLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${latoSans.variable} ${latoSans.variable} ${courgette.variable} antialiased`}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
