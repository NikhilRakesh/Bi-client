import Footer from "@/components/Footer/Footer";

export default function RefundPolicy() {
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-indigo-50 to-sky-50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Refund Policy</h1>
        <p className="text-gray-700 mb-4">
          At Brands Info, we prioritize customer satisfaction. If you are not
          satisfied with our services, please review our refund policy below.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          1. Eligibility for Refunds
        </h2>
        <p className="text-gray-700 mb-4">
          Refunds are applicable under the following conditions:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Incorrect or duplicate payment.</li>
          <li>Technical issues preventing access to paid features.</li>
          <li>Cancellation within 7 days of purchase for eligible packages.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          2. Non-Refundable Items
        </h2>
        <p className="text-gray-700 mb-4">Refunds are not applicable for:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Used or availed services.</li>
          <li>Marketing and promotional packages after activation.</li>
          <li>Violations of our terms and conditions.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          3. Refund Process
        </h2>
        <p className="text-gray-700 mb-4">
          To request a refund, follow these steps:
        </p>
        <ol className="list-decimal pl-6 text-gray-700 mb-4">
          <li>
            Submit a refund request via our support email with your transaction
            details.
          </li>
          <li>Our team will review the request within 5-7 business days.</li>
          <li>
            If approved, the refund will be credited to the original payment
            method within 10 business days.
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          4. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions regarding our refund policy, please contact
          our support team at
          <span className="font-semibold"> support@brandsinfo.com</span>.
        </p>
      </div>
      <Footer/>
    </div>
  );
}
