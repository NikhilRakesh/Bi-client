

export default function Careers() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h1>
      <p className="text-gray-700 mb-6">
        At <span className="font-semibold">Brands Info</span>, we believe in innovation, creativity, and collaboration. We are looking for passionate individuals who want to make an impact in the digital business world.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Why Work With Us?</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6">
        <li>Be part of a rapidly growing digital platform.</li>
        <li>Collaborate with industry experts and creative minds.</li>
        <li>Enjoy a flexible, dynamic, and inclusive work environment.</li>
        <li>Opportunities for professional growth and learning.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Current Openings</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Frontend Developer</h3>
        <p className="text-gray-700">We&apos;re looking for a React.js developer with experience in Next.js and Tailwind CSS.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Digital Marketing Specialist</h3>
        <p className="text-gray-700">Help businesses grow by optimizing digital strategies and running ad campaigns.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Sales Executive</h3>
        <p className="text-gray-700">Drive revenue by connecting businesses with our platform and digital services.</p>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">How to Apply?</h2>
      <p className="text-gray-700 mb-4">
        Send your resume and portfolio to <span className="font-semibold">careers@brandsinfo.com</span> with the subject line
        &quot;<span className="font-semibold">Job Application - [Position Name]</span>&quot;.
      </p>
      <p className="text-gray-700">
        We look forward to welcoming you to our team and shaping the future together!
      </p>
    </div>
  );
}