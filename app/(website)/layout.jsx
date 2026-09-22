import Header from './Components/Header'
import Footer from './Components/Footer'
import LunaWidget from './Components/Luna/LunaWidget'

export default function HomeLayout({ children }) {
    return (
        <>
            {/* Theme-aware page-wide backdrop (shows through transparent sections). */}
            <div className="site-gradient-bg" aria-hidden="true" />
            <Header />
            {children}
            <Footer />
            {/* Luna assistant — public-site-only floating helper (bottom-right). */}
            <LunaWidget />
        </>
    );
}
