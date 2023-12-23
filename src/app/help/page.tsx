// HelpPage.js

import React from "react";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg text-black">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>

        <p>
          If you require assistance or have any questions, please feel free to
          contact our support team by emailing{" "}
          <strong>support@rondevu.app</strong>.
        </p>
        <br />
        <p>
          Our team is here to help you with any issues you may encounter or to
          provide guidance on using the Rondevu app. We strive to respond to
          your inquiries as quickly as possible.
        </p>
        <br />
        {/* Additional Information (if needed) */}
        <p>
          For urgent matters or technical support, please include relevant
          details in your email, and we&aposll get back to you promptly.
        </p>
        <br />
        {/* Contact Us */}
        <p>Thank you for using Rondevu!</p>
      </div>
    </div>
  );
};

export default HelpPage;
