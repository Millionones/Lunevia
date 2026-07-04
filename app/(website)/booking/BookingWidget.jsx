"use client";

import { useEffect } from "react";

export default function BookingWidget() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="widget.min.2.0.js"]'
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src =
        "https://s3-ap-southeast-1.amazonaws.com/djubo-static/static/widget/js/widget.min.2.0.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="widget">
      <div id="book-now-widget">
        <div id="BEx4IDaY3bWD">
          <div
            id="BEx4IDaY3bWR"
            className="BEx4ZXaY3bWR"
          ></div>

          <input
            type="hidden"
            value="irNf-cNuTdbCw-jo1dErsQ"
            id="Q8K5oqMdhnRu9P_DKGkutw"
          />

          <input
            type="hidden"
            value="WkFWSSYtDSCKYZe4F7DPbA"
            id="BEx4ZYaLkProGuid"
          />
        </div>
      </div>
    </div>
  );
}