import Footer from "@/components/Footer/Footer";

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-indigo-50 to-sky-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-4">
          At Brands Info, we are committed to protecting your privacy. This
          policy outlines how we collect, use, and safeguard your information.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>
            Personal information (name, email, phone number) provided during
            registration.
          </li>
          <li>Business details, listings, and transaction history.</li>

          <li>
            Device, browser, and location data for analytics and service
            improvement.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>To create and manage user accounts and business listings.</li>

          <li>
            To personalize user experience and provide targeted promotions.
          </li>

          <li>
            To improve platform performance, security, and customer support.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          3. Sharing and Disclosure
        </h2>
        <p className="text-gray-700 mb-4">
          We do not sell user data. Information may be shared only under the
          following conditions:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>
            With third-party service providers for marketing, analytics, and
            payment processing.
          </li>
          <li>To comply with legal obligations or protect user rights.</li>
          <li>For business promotions, only with user consent.</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          4. Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          We implement strict security measures to protect user data. However,
          users are responsible for maintaining the security of their login
          credentials.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          5. Cookies and Tracking
        </h2>{" "}
        <p className="text-gray-700 mb-4">
          We use cookies to enhance user experience, analyze trends, and provide
          personalized services. Users can manage cookie preferences in their
          browser settings.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          6. User Rights
        </h2>
        <p className="text-gray-700 mb-4">Users have the right to:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Access, update, or delete their personal information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request a copy of their stored data.</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          7. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this privacy policy from time to time. Users will be
          notified of significant changes via email or platform notifications.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          8. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions regarding this policy, please contact us at{" "}
          <span className="font-semibold"> privacy@brandsinfo.com</span>.
        </p>
      </div>
      <Footer />
    </div>
  );
}
