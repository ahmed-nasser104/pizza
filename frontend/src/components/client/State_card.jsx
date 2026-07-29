export default function StatCard({ title, value, change, icon: Icon, trend }) {
  const isPositive = trend === "up";

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {value}
          </p>
          <p
            className={`text-sm font-medium mt-3 ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} from last month
          </p>
        </div>
        <div
          className={`p-3 rounded-lg ${isPositive ? "bg-green-100" : "bg-red-100"}`}
        >
          <Icon
            size={24}
            className={isPositive ? "text-green-600" : "text-red-600"}
          />
        </div>
      </div>
    </div>
  );
}
