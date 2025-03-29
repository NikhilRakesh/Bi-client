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

export default function MobileProfileGraph({ business }: ProfileGraphProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={business?.visits}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#f28b21" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
