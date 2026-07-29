import { Settings, ShieldCheck, Bell, Palette } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

const cards = [
  {
    title: "Security",
    description: "Review access controls and account safety.",
    icon: ShieldCheck,
  },
  {
    title: "Notifications",
    description: "Adjust alerts for orders and inventory updates.",
    icon: Bell,
  },
  {
    title: "Appearance",
    description: "Fine-tune the visual style of the admin experience.",
    icon: Palette,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure restaurant workflow preferences"
        icon={Settings}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Icon size={20} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
