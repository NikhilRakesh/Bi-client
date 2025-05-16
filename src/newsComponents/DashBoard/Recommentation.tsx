import { IoIosArrowForward } from "react-icons/io";

export default function Recommentation() {
  const Recommended = [
    {
      category: "Business News",
      heading: "India's Stock Market Hits Record Highs as Tech Stocks Surge",
      image:
        "https://imgs.search.brave.com/RdGarNs_syf_upPEBdl2eMTfdJQ0-VxpkOUwNF5sPEA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ha20t/aW1nLWEtaW4udG9z/c2h1Yi5jb20vYnVz/aW5lc3N0b2RheS9p/bWFnZXMvc3Rvcnkv/MjAyNTA0LzY3Zjhk/ZGVkYmFjMDYtbnNl/cy1pbnZlc3Rvci1w/cm90ZWN0aW9uLWZ1/bmQtaXBmLWFsc28t/c2F3LWEtYm9vc3Qt/LWdyb3dpbmctYnkt/b3Zlci0yMy15ZWFy/LW9uLXllYXItdG8t/Mi00NTktYy0xMTE2/MjM4NjUtMTZ4OS5q/cGc_c2l6ZT0yOTg6/MTY4",
      time: "1 day ago",
    },
    {
      category: "Sports News",
      heading: "IPL 2025: Chennai Super Kings Clinch Last-Ball Thriller",
      image:
        "https://imgs.search.brave.com/Gk6t7UC7nNZrVpQjsuV-sWInhJcuqNd8L7jUWeIxpjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcm9w/Lm5kdHYuY29tL2Fs/YnVtcy9TUE9SVFMv/aW4tcGljcy1yY2It/d2luXzYzODgxMTk2/OTAxNzY3MDM0OC82/Mzg4MTE5NjkwMTc2/NzAzNDhfNjQweDQ4/MC5qcGVnP291dHB1/dC1xdWFsaXR5PTgw/JmRvd25zaXplPTUy/Mjoq",
      time: "6 hrs ago",
    },
    {
      category: "Technology",
      heading: "OpenAI Launches GPT-5 with Multi-Modal Capabilities",
      image:
        "https://imgs.search.brave.com/Z_qk9cc1EL4pEttfbceN6scFoyA2_MZF0Jrn2jJ-LYc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXpt/b2RvLmNvbS9hcHAv/dXBsb2Fkcy8yMDI0/LzA1LzcyMzA0YTk4/ODU5MDNhMmJmY2Jh/NzljYTQwNjA4YzMw/LWUxNzQwMDgwMDg5/NzM5LmpwZw",
      time: "2 days ago",
    },
    {
      category: "Entertainment",
      heading: "Bollywood Star Announces New Thriller on Netflix",
      image:
        "https://imgs.search.brave.com/PB6p5wiBcaCKHEV3q2AGwFziTFBocneLwYjZT2DPttY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iaW5n/ZWRkYXRhLnMzLmFt/YXpvbmF3cy5jb20v/dXBsb2Fkcy8yMDIw/LzA2L3RvcC1Cb2xs/eXdvb2QtVGhyaWxs/ZXItTW92aWVzLU5l/dGZsaXgtQW1hem9u/LVByaW1lLVZpZGVv/LmpwZw",
      time: "8 hrs ago",
    },
    {
      category: "Health",
      heading: "WHO Warns of Rising Global Mental Health Crisis",
      image:
        "https://imgs.search.brave.com/2YhVitABPTkUlnF53wXKX9VlmtMzGv-DDsg5wfaAIkk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXNwZW5pbnN0aXR1/dGUub3JnL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIzLzAxL0FJ/VEcxLjExLjIzLWNh/cmQuanBn",
      time: "3 days ago",
    },
  ];
  return (
    <div className="w-3/12 bg-[#f3f8ff] border rounded-xl p-2">
      <div className="flex justify-between mb-4">
        <h1 className=" font-bold ">Recommended</h1>
        <span className="flex text-gray-500 text-sm gap-1 items-center">
          <p>view all</p>
          <IoIosArrowForward className="text-sm" />
        </span>
      </div>
      <div className="relative rounded-xl overflow-hidden mb-3">
        <img
          src="/news/1729052106-1195.avif"
          className="w-full  object-cover"
          alt="Business News"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-0 p-4 text-white z-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-300">
            Business News{" "}
            <span className="text-gray-300 font-normal">· 4 hours ago</span>
          </p>
          <p className="text-sm text-gray-100 font-bold mt-1 leading-snug ">
            Swiggy Q4FY25 results: Loss almost doubles to ₹1,081 cr, revenue
            jumps 45%
          </p>
        </div>
      </div>

      {Recommended.map((item, index) => (
        <div key={index} className="   p-3">
          <p className="text-xs text-gray-500 ">
            <span className="text-blue-700"> {item.category}</span> •{" "}
            {item.time}
          </p>
          <div className="flex gap-1">
            <h3 className="text-md font-semibold mt-1">{item.heading}</h3>
            <img
              src={item.image}
              alt={item.heading}
              className="w-10 object-cover rounded"
            />
          </div>
          <hr className=" mt-3" />
        </div>
      ))}
    </div>
  );
}
