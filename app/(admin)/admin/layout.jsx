import { Geist, Geist_Mono, Lato } from "next/font/google";
import { Providers } from './providers'
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

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${latoSans.variable} ${latoSans.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}