import StoriesForYou from "./StoriesForYou";

const homedata = [
  {
    title:
      "IndiGo cancels multiple flights amid heightened security measures, airport closures",
    category: "DeFi",
    img: "https://images.cnbctv18.com/uploads/2024/01/indigo-airline-plane.jpg?impolicy=website&width=640&height=360",
  },
  {
    title:
      "YES Bank stake sale: SBI, HDFC Bank and 6 others to cut holdings. Here's why",
    category: "Web 3",
    img: "https://www.livemint.com/lm-img/img/2025/05/09/600x338/YES_BANK_House_1714214485018_1746786388854.jpg",
  },
  {
    title:
      "Sony to launch its flagship WH-1000XM6 headphones on May 16 and here is everything we know about them",
    category: "Crypto",
    img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202505/sony-wh-1000xm5-091118616-16x9_0.jpg?VersionId=EXMYrC8Iv.2hHTif8Bhn4.ZBoUlomtvl&size=690:388",
  },
  {
    title:
      "IPL suspended for one week due to India-Pakistan conflict; Check BCCI’s full statement",
    category: "Metaverso",
    img: "https://images.indianexpress.com/2025/05/IPL_534579.jpg?w=640",
  },
];

export default function DashBoard() {
  return (
    <div className="md:col-span-2 flex flex-col ">
      <span className="text-xs font-semibold text-purple-600 uppercase mb-4 ">
        Best of the week
      </span>
      <div className="w-full flex gap-4">
        <div className="w-4/12 relative rounded-xl overflow-hidden">
          <img
            src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/d0f1/live/f6f7e060-2c93-11f0-8683-9b1503cf649e.jpg.webp"
            alt="Crypto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white flex flex-col justify-end">
            <span className="text-sm text-gray-100 mb-2 flex items-center gap-2">
              <img
                src="https://imgs.search.brave.com/ladlNU58V2lMKiUkC69zpBdYFESGL0oUmHiR01qNOPw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQw/OTEzMTUzNTQzL05C/Qy1uZXdzLW5ld3Mt/bG9nby53ZWJw"
                alt=""
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-300"> • 4 hours ago</span>
            </span>
            <h2 className="text-lg font-semibold truncate">
              The first drone war opens a new chapter in India-Pakistan conflict
            </h2>
            <p className="text-xs mt-1">Blockchain News • Dic 12, 2025</p>
          </div>
        </div>

        <div className="w-8/12 grid grid-cols-2 gap-4">
          {homedata?.map((card, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3 text-white flex flex-col justify-end">
                <span className="text-sm text-gray-100 mb-2 flex items-center gap-2">
                  <img
                    src="https://imgs.search.brave.com/zy5zGWcS6M3DUD0k3IZHr_x1ap_sLiqkbAAzJZaDm6E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQw/OTEzMTUzNTM3L0JC/Qy1uZXdzLWxvZ28u/d2VicA"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-300"> • 4 hours ago</span>
                </span>
                <h3 className="text-sm font-semibold truncate">{card.title}</h3>
                <p className="text-xs mt-1">Blockchain News • Dic 12, 2025</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <span className="text-xs font-semibold text-purple-600 uppercase ">
          Best of the week
        </span>
      </div>
      <StoriesForYou />
    </div>
  );
}
