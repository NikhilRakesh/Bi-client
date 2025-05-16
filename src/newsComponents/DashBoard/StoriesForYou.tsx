export default function StoriesForYou() {
  const newsArticles = [
    {
      id: 1,
      image:
        "https://s.yimg.com/ny/api/res/1.2/S0u0_dnneLSYE85sJrwIBg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/reuters.com/af29a150a8d5b1de6777d0e99e16be98",
      title:
        "India and Pakistan don’t fight wars like other countries. Here’s why India and Pakistan have fought three full-scale wars since they gained independence from Britain in 1947",
      description:
        "India and Pakistan have fought three full-scale wars since they gained independence from Britain in 1947. The latest escalation follows a deadly gun attack on tourists that India blame, India and Pakistan have fought three full-scale wars since they gained independence from Britain in 1947. The latest escalation follows a deadly gun attack on tourists that India blame...",
      authorImage:
        "https://imgs.search.brave.com/zy5zGWcS6M3DUD0k3IZHr_x1ap_sLiqkbAAzJZaDm6E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQw/OTEzMTUzNTM3L0JC/Qy1uZXdzLWxvZ28u/d2VicA",
      authorName: "Social News",
      timestamp: "4 hours ago",
      source: "Associated Press",
    },
    {
      id: 2,
      image:
        "https://assets.aboutamazon.com/dims4/default/439d9a3/2147483647/strip/true/crop/2548x1434+2+0/resize/2640x1486!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F9f%2Fa1%2F2afa66474d13861989a0e2e36299%2Fhero001-aa-kuiper-amazon-untitled-2-copy-2550x1434.JPG",
      title: "New Global Economic Trends and What They Mean for 2025",
      description:
        "As the world economy enters the new year, analysts are predicting significant changes in global trade, interest rates, and emerging markets. This article explores the major economic trends to watch for in 2025.",
      authorImage:
        "https://imgs.search.brave.com/MIOEfuovFLX2YaO1GUQkNTo_xhV8oC-4DlezLhVIB40/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9DTk4vQ05O/LUxvZ28ud2luZS5z/dmc",
      authorName: "Global News Network",
      timestamp: "2 hours ago",
      source: "Reuters",
    },
    {
      id: 3,
      image:
        "https://s.yimg.com/ny/api/res/1.2/qv40.QFYenHITMB7HZmB_w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https://media.zenfs.com/en/the_atlantic_news_articles_892/ccddd159eb38ce8a7f7e31f8117aa531",
      title: "How Climate Change is Impacting Global Agriculture",
      description:
        "Climate change is having a profound impact on agricultural output around the world. Experts weigh in on what countries can do to adapt and mitigate the effects on food production.",
      authorImage:
        "https://imgs.search.brave.com/Pbi-wye-7CdhidMLE7ZNP7G2xoHuc5TwYLWFon8okh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGF0Y2h3aXNlLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wMy9CQkMtTG9n/by03Njh4NDMyLTEu/anBlZw",
      authorName: "Environmental Insights",
      timestamp: "6 hours ago",
      source: "National Geographic",
    },
    {
      id: 4,
      image:
        "https://s.yimg.com/ny/api/res/1.2/FvPig10M4b60FiOwLV8caQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MA--/https://media.zenfs.com/en/space_311/cddbe2dce8ee722e69461870551cd17a",
      title: "Advancements in AI Technology That Will Change the World",
      description:
        "Artificial Intelligence continues to evolve rapidly, with new breakthroughs that promise to reshape industries from healthcare to finance. This article dives into the top innovations in AI this year.",
      authorImage:
        "https://imgs.search.brave.com/gN4JHXdyzCBcq3sJ9zhcGbst2yuC6BcZbD7C-cbkT6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9rcmVh/Zm9say5jb20vY2Ru/L3Nob3AvYXJ0aWNs/ZXMvZXNwbi1sb2dv/LWRlc2lnbi1oaXN0/b3J5LWFuZC1ldm9s/dXRpb24ta3JlYWZv/bGtfOGFjZmI1ZDkt/Mzg0YS00MTVlLTg5/NzUtMzAzNzQ1YTRh/NWE0LmpwZz92PTE3/MTc3MjQ5ODgmd2lk/dGg9MTUwMA",
      authorName: "Tech Today",
      timestamp: "1 day ago",
      source: "MIT Technology Review",
    },
    {
      id: 5,
      image:
        "https://s.yimg.com/ny/api/res/1.2/Cf1TUpRhnxOpfzxQ_Es1pA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE5MjA7aD0xMDgw/https://media.zenfs.com/en/cnn_articles_875/720209c195215a21f8b04a74d64f7acf",
      title: "The Future of Space Exploration: What's Next?",
      description:
        "Space agencies around the world are planning new missions to explore the Moon, Mars, and beyond. What are the next big milestones in space exploration?",
      authorImage:
        "https://imgs.search.brave.com/hkUglx9iX6lkDFjG-VGmleygtLhMABvUiY1g5Q4_39A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/bWFrZXJyLmFpL3Vw/bG9hZHMvb3V0cHV0/LzIwMjMvMTIvMjYv/YTllZDYyNGUzNjc0/NDc1ZGRkNGEwM2Zl/NmY5ZjE3ZDYuanBn",
      authorName: "Space News",
      timestamp: "3 days ago",
      source: "NASA",
    },
  ];

  return (
    <div className="py-10 ">
      {newsArticles.map((data) => (
        <div key={data.id} className="flex gap-4 mb-5">
          <div className="w-1/3  rounded-xl overflow-hidden">
            <img
              src={data.image}
              alt="image not available"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-2/3 flex flex-col justify-between">
            <div>
              <span className="text-sm text-gray-100 mb-2 flex items-center gap-2">
                <img
                  src={data.authorImage}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-400"> • {data.timestamp}</span>
              </span>

              <h2 className="text-lg font-bold mt-1">{data.title}</h2>
              <p className="text-sm text-gray-700 mt-1 ">{data.description}</p>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              {data.authorName}
              <span className="text-gray-400">• {data.source}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
