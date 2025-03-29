import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Business {
  visits: { date: string; count: number }[];
}

interface ProfileGraphProps {
  business: Business;
}

export default function ProfileGraph({ business }: ProfileGraphProps) {
  const hasData = business?.visits?.length > 0;

  return (
    <div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={business.visits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f28b21" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-500">
          <p>No daily data available.</p>
        </div>
      )}
    </div>
  );
}
