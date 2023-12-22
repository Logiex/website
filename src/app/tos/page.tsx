// TermsOfService.js

import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
        {/* Last Updated */}
        <p className="text-sm text-gray-500 mb-4">Last updated: 12/18/23</p>

        {/* Introduction */}
        <p className="mb-6 text-black">
          This document outlines the terms and conditions (&quot;Terms&quot;)
          governing the use of the Rendovu mobile application (the &quot; App
          &quot; ) provided by Rondevu ( &quot; us, &quot; &quot; we, &quot; or
          &quot; our &quot; ).
        </p>

        {/* Acceptance of Terms */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
          <p>
            By using the App, you acknowledge that you have read, understood,
            and agree to be bound by these Terms. We reserve the right to update
            or modify these Terms at any time without prior notice. It is your
            responsibility to review these Terms periodically for changes.
            Continued use of the App after the posting of changes constitutes
            acceptance of those changes.
          </p>
        </section>

        {/* User Accounts and Registration */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">
            2. User Accounts and Registration
          </h3>
          <p>
            To access certain features of the App, you may be required to
            register for an account. You agree to provide accurate, current, and
            complete information during the registration process and to update
            such information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your device. You
            agree to accept responsibility for all activities that occur under
            your account or password.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">3. User Conduct</h3>
          <p>
            You agree to use the App in accordance with all applicable laws and
            regulations. You further agree not to:
          </p>
          <ul className="list-disc pl-6">
            <li>Use the App for any illegal or unauthorized purpose.</li>
            <li>
              Interfere with or disrupt the operation of the App or the servers
              or networks used to make the App available.
            </li>
            <li>
              Impersonate any person or entity or provide false information.
            </li>
            <li>
              Share nudity or graphic images in any form of pictures or other
              media.
            </li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">4. Privacy Policy</h3>
          <p>
            Your use of the App is also governed by our Privacy Policy, which is
            available{" "}
            <a href="/privacy-policy" className="text-blue-500">
              here
            </a>
            . By using the App, you agree to the terms of the Privacy Policy.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">
            5. Intellectual Property
          </h3>
          <p>
            The App and its original content, features, and functionality are
            owned by Rondevu and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property or
            proprietary rights laws.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">6. Termination</h3>
          <p>
            We reserve the right to terminate or suspend your account and access
            to the App at our sole discretion, without prior notice or
            liability, for any reason whatsoever, including without limitation
            if you breach these Terms.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">
            7. Disclaimer of Warranties
          </h3>
          <p>
            The App is provided &quot; as is &quot; and &quot; as available
            &quot; without any warranties of any kind, whether express or
            implied.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h3>
          <p>
            To the fullest extent permitted by applicable law, Rondevu shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-6 text-black">
          <h3 className="text-xl font-semibold mb-2">9. Governing Law</h3>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            principles.
          </p>
        </section>

        {/* Contact Us */}
        <section className="text-black">
          <h3 className="text-xl font-semibold mb-2 ">10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us at
            support@rondevu.app.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
