"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// months from Jan 2021, month is 1-indexed
function mo(year: number, month: number) {
  return (year - 2021) * 12 + (month - 1);
}

const JOBS = [
  {
    x: mo(2021, 1),
    y: 1,
    name: "Jacobs University",
    role: "Peer Counselor",
    color: "#fde68a",
    current: false,
  },
  {
    x: mo(2021, 9),
    y: 2,
    name: "Jacobs University",
    role: "Student Assistant",
    color: "#fde68a",
    current: false,
  },
  {
    x: mo(2022, 4),
    y: 3,
    name: "3SSENTIA",
    role: "Frontend Developer Intern",
    color: "#f43f5e",
    current: false,
  },
  {
    x: mo(2022, 6),
    y: 4,
    name: "getCoding",
    role: "Frontend Working Student",
    color: "#f97316",
    current: false,
  },
  {
    x: mo(2022, 9),
    y: 5,
    name: "Jacobs University",
    role: "Tech Team Member",
    color: "#fde68a",
    current: false,
  },
  {
    x: mo(2022, 10),
    y: 6,
    name: "newboxes",
    role: "Software Engineer Working Student",
    color: "#a78bfa",
    current: false,
  },
  {
    x: mo(2023, 8),
    y: 7,
    name: "RIB IMS GmbH",
    role: "Junior Software Developer",
    color: "#60a5fa",
    current: false,
  },
  {
    x: mo(2025, 8),
    y: 8,
    name: "Axel Springer",
    role: "Software Developer",
    color: "#6ee7b7",
    current: true,
  },
];

const YEAR_TICKS = [0, 12, 24, 36, 48, 60];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d?.name) return null;
  return (
    <div
      style={{
        background: "rgba(3,7,18,0.95)",
        border: `1px solid ${d.color}40`,
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px ${d.color}20`,
      }}
    >
      <div style={{ color: d.color, fontWeight: 600, fontSize: 13 }}>
        {d.name}
      </div>
      <div
        style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 }}
      >
        {d.role}
      </div>
      {d.current && (
        <div
          style={{
            color: d.color,
            fontSize: 10,
            marginTop: 6,
            opacity: 0.7,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Current
        </div>
      )}
    </div>
  );
}

function CustomDot(props: any) {
  const { cx, cy, payload } = props;
  if (!payload) return null;
  const { color, current } = payload;
  return (
    <g>
      {current && (
        <>
          <circle cx={cx} cy={cy} r={18} fill={color} fillOpacity={0.08} />
          <circle cx={cx} cy={cy} r={12} fill={color} fillOpacity={0.15} />
        </>
      )}
      <circle
        cx={cx}
        cy={cy}
        r={current ? 7 : 5}
        fill={color}
        stroke="#030712"
        strokeWidth={2}
      />
      {current && (
        <circle
          cx={cx}
          cy={cy}
          r={7}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={0.5}
        />
      )}
    </g>
  );
}

export default function WorkHistory() {
  return (
    <div className="mt-20 container">
      <div className="text-center mb-10">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text mb-3">
          The Journey
        </div>
        <h3 className="font-serif text-3xl md:text-4xl">Work Timeline</h3>
        <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">
          Every role that shaped how I build today.
        </p>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: "32px 16px 24px",
        }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={JOBS}
            margin={{ top: 20, right: 40, left: 0, bottom: 8 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="4 4"
              vertical={true}
              horizontal={false}
            />
            <XAxis
              dataKey="x"
              type="number"
              domain={[-4, 63]}
              ticks={YEAR_TICKS}
              tickFormatter={(v) => String(2021 + v / 12)}
              tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis hide domain={[0, 9]} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="url(#lineGrad)"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={false}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fde68a" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity={1} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>

        {/* Dot legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
          {JOBS.map((j) => (
            <div key={j.role} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: j.color }}
              />
              <span className="text-white/30 text-xs">
                {j.name === "Jacobs University" ? j.role : j.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
