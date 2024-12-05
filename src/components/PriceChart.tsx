import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", price: 42000 },
  { date: "Feb", price: 45000 },
  { date: "Mar", price: 48000 },
  { date: "Apr", price: 44000 },
  { date: "May", price: 46000 },
  { date: "Jun", price: 50000 },
];

export const PriceChart = () => {
  return (
    <div className="glass-card p-4 rounded-lg h-[400px]">
      <h2 className="text-xl font-bold mb-4">Bitcoin Price</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E396" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00E396" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#00E396"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};