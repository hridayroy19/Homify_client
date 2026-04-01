import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";

const MONTH_ORDER = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function aggregateMonthlyData(transactions) {
  const monthlyData = {};

  transactions.forEach(({ date, amount, property }) => {
    const month = new Date(date).toLocaleString("en-US", { month: "short" });
    if (!monthlyData[month]) {
      monthlyData[month] = { name: month, Sale: 0, Rent: 0 };
    }
    const type = property.property_status.toLowerCase();
    if (type.includes("sale")) monthlyData[month].Sale += amount;
    else if (type.includes("rent")) monthlyData[month].Rent += amount;
  });

  return MONTH_ORDER.map(
    (m) => monthlyData[m] || { name: m, Sale: 0, Rent: 0 },
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm shadow-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-purple-600">
        Sale:{" "}
        <span className="font-medium">
          ৳{payload[0]?.value?.toLocaleString()}
        </span>
      </p>
      <p className="text-green-600">
        Rent:{" "}
        <span className="font-medium">
          ৳{payload[1]?.value?.toLocaleString()}
        </span>
      </p>
    </div>
  );
};

const Annualreport = () => {
  const [propertydata, setPropertydata] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/admin/annual")
      .then((e) => {
        const result = aggregateMonthlyData([...e.data.sale, ...e.data.rent]);
        setPropertydata(result);
      })
      .catch((err) => console.log(err.message));
  }, [axiosPublic]);

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-purple-400 inline-block" />
          <span className="text-xs text-gray-500 font-medium">Sale</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-green-400 inline-block" />
          <span className="text-xs text-gray-500 font-medium">Rent</span>
        </div>
      </div>

      {/* Chart — ResponsiveContainer replaces manual resize listener */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={propertydata}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="Sale"
            stroke="#a78bfa"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSale)"
            dot={false}
            activeDot={{ r: 4, fill: "#a78bfa" }}
          />
          <Area
            type="monotone"
            dataKey="Rent"
            stroke="#4ade80"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRent)"
            dot={false}
            activeDot={{ r: 4, fill: "#4ade80" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Annualreport;
