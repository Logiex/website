// PrivacyPolicy.js

import React from "react";


// PrivacyPolicy.js

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 mb-4">Last updated: 12/18/23</p>

        {/* Introduction */}
        <p>
          Rondevu (&quot;Rondevu,&quot; &quot;us&quot; &quot;we,&quot; or
          &quot;our&quot;) operates the Rondevu mobile application (the
          &quot;App&quot;). This page informs you of our policies regarding the
          collection, use, and disclosure of personal data when you use our App
          and the choices you have associated with that data. We use your data
          to provide and improve the App, connecting users with activities they
          may be interested in within their local communities. By using the App,
          you agree to the collection and use of information in accordance with
          this policy.
        </p>

        {/* Information Collection and Use */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Information Collection and Use
          </h3>
          <p>
            We collect several types of information for various purposes to
            provide and enhance our service to you.
          </p>
        </section>

        {/* Types of Data Collected */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Types of Data Collected
          </h3>
          <p>
            <strong>Personal Data</strong>
          </p>
          <p>
            While using our App, we may ask you to provide us with certain
            personally identifiable information to enhance your experience
            (&quot;Personal Data&quot;). Personally identifiable information may
            include, but is not limited to:
          </p>
          <ul className="list-disc pl-6">
            <li>Email address</li>
            <li>Location data</li>
            <li>Interests and preferences</li>
            <li>User-generated content</li>
          </ul>
          <p>
            <strong>Usage Data</strong>
          </p>
          <p>
            We may also collect information on how the App is accessed and used
            (&quot;Usage Data&quot;). This Usage Data may include information
            such as your device&apos;s Internet Protocol address (e.g., IP
            address), device type, operating system, app version, the pages of
            our App that you visit, the time and date of your visit, and other
            diagnostic data.
          </p>
        </section>

        {/* Use of Data */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Use of Data</h3>
          <p>Rondevu uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6">
            <li>To provide and personalize the App experience</li>
            <li>
              To match users with activities based on their interests and
              location
            </li>
            <li>
              To notify users about events and updates related to their
              interests and local communities
            </li>
            <li>
              To facilitate communication between users with shared interests
            </li>
            <li>To gather insights for analysis and improvement of the App</li>
            <li>To monitor the usage of the App</li>
            <li>To detect, prevent, and address technical issues</li>
          </ul>
        </section>

        {/* Location Data */}

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Location Data</h3>
          <p>
            Rendovu utilizes location data to match users with activities
            happening in their local communities. Users have the option to
            control location services through their device settings.
          </p>
        </section>

        {/* Disclosure of Data */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Disclosure of Data</h3>
          {/* Add your content here */}
          <h5>Third party partners</h5>
          <p>
            Rondevu may collaborate with third-party partners to enhance the App
            experience. These partners may have access to your Personal Data
            only to perform tasks on our behalf and are obligated not to
            disclose or use it for any other purpose.
          </p>
        </section>

        {/* Security of Data */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Security of Data</h3>
          <p>
            The security of your data is important to us. We strive to use
            commercially acceptable means to protect your Personal Data, but no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. We cannot guarantee its absolute security.
          </p>
        </section>

        {/* Your Data Protection Rights */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Your Data Protection Rights
          </h3>
          <p>
            Rondevu aims to take reasonable steps to allow you to correct,
            amend, delete, or limit the use of your Personal Data. Users can
            manage their privacy settings within the App or by Email.
          </p>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Changes to This Privacy Policy
          </h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us: - By email: [Your email address] - Through the App: [Include
            relevant in-app contact information]
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
