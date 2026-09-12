import Header from './Components/Header'
import Footer from './Components/Footer'

export default function HomeLayout({ children }) {
    return (
        <>
            {/* Theme-aware page-wide backdrop (shows through transparent sections). */}
            <div className="site-gradient-bg" aria-hidden="true" />
            <Header />
            {children}
            <Footer />
        </>
    );
}
