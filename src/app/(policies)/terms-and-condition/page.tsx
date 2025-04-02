import Footer from "@/components/Footer/Footer";

export default function TermsAndConditions() {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-indigo-50 to-sky-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to Brands Info. By using our platform, you agree to comply
          with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Account Registration</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Users must provide accurate and complete information during registration.</li>
          <li>Accounts are non-transferable, and users are responsible for maintaining confidentiality.</li>
          <li>Users must be at least 18 years old to register.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Business Listings and Content</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Businesses must ensure that listings contain accurate and lawful content.</li>
          <li>Brands Info reserves the right to edit or remove listings that violate our policies.</li>
          <li>Users are prohibited from posting misleading or fraudulent content.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Payments and Subscriptions</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>All purchases are final, and refunds will be provided as per our refund policy.</li>
          <li>Subscription plans renew automatically unless canceled before the renewal date.</li>
          <li>For refund requests, users must contact support within 3 days of purchase.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">4. User Responsibilities</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Users must not engage in fraudulent activities or misuse the platform.</li>
          <li>Businesses must honor commitments made to customers through our platform.</li>
          <li>Users must not share sensitive personal information without proper consent.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content, trademarks, and services provided by Brands Info are
          protected and may not be copied, modified, or redistributed without
          permission.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">6. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Brands Info is not liable for any loss, damage, or disputes arising
          from the use of our platform, except where required by law.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">7. Termination</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate accounts that violate our
          terms without prior notice.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">8. Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We respect your privacy. Please refer to our <strong>Privacy Policy</strong> for detailed information on how we handle your data.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">9. Force Majeure</h2>
        <p className="text-gray-700 mb-4">
          Neither party shall be held liable for any failure or delay in performance due to events beyond their reasonable control, including but not limited to acts of God, war, terrorism, or natural disasters.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">10. Governing Law and Dispute Resolution</h2>
        <p className="text-gray-700 mb-4">
          These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">11. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          Brands Info may update these terms at any time. Users will be notified of significant changes.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">12. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          For any questions regarding these terms, contact us at <span className="font-semibold">support@brandsinfo.com</span>.
        </p>
      </div>
      <Footer />
    </div>
  );
}
