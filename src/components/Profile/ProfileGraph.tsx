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
  profileVisitsData: { name: string; visits: number }[];
}

interface ProfileGraphProps {
  business: Business; 
}

export default function ProfileGraph({ business }: ProfileGraphProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={business?.profileVisitsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#f28b21" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
