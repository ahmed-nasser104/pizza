export default function PageHeader({ title, description, action, icon: Icon }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <Icon size={20} />
          </div>
        ) : null}

        <div>
          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
