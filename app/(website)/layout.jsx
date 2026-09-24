import Header from './Components/Header'
import Footer from './Components/Footer'
import LunaWidget from './Components/Luna/LunaWidget'
import { LunaProvider } from './Components/Luna/LunaContext'

export default function HomeLayout({ children }) {
    return (
        // LunaProvider spans {children} (which includes the homepage hero
        // character) and LunaWidget so both share one chat + hand off cleanly.
        <LunaProvider>
            {/* Theme-aware page-wide backdrop (shows through transparent sections). */}
            <div className="site-gradient-bg" aria-hidden="true" />
            <Header />
            {children}
            <Footer />
            {/* Luna assistant — public-site-only floating helper (bottom-right). */}
            <LunaWidget />
        </LunaProvider>
    );
}
