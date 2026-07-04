import BookingWidget from "./BookingWidget";
import "./style.css";
export default function BookingPage() {
    return (
        <main className="booking-page">
            <div className="cmpad">
                <div className="booking-page-inner">
                    <h1 className="booking-page-title">
                        Book Your Stay
                    </h1>
                    <BookingWidget />
                </div>

            </div>
        </main>
    );
}