export function EntityPanel({ eyebrow, title, subtitle, renderFields, checked, onToggleChange, editingId, setEditingId, setForm, initialForm, onSubmit, isSubmitting, saveLabel, listingTitle, listingSubtitle, items, renderItem }) {
  return (
    <section className="mt-6 grid gap-6 2xl:grid-cols-[430px_1fr]">
      <PanelCard eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <form onSubmit={onSubmit} className="grid gap-4">
          {renderFields}
          <ToggleRow checked={checked} onChange={onToggleChange} label="Active on public website" />
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
              {isSubmitting ? "Saving..." : editingId ? `Update ${saveLabel}` : `Create ${saveLabel}`}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className={secondaryButtonClass}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </PanelCard>

      <PanelCard eyebrow="Database Records" title={listingTitle} subtitle={listingSubtitle}>
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#ddceb7] bg-[#fcfaf6] px-5 py-12 text-center text-sm text-[#6b625a]">
            No records added yet.
          </div>
        ) : (
          <div className="grid gap-4">{items.map(renderItem)}</div>
        )}
      </PanelCard>
    </section>
  );
}

export function PanelCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="rounded-[32px] border border-[#eadfce] bg-white p-6 shadow-[0_20px_50px_rgba(32,18,10,0.06)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ba8f2a]">{eyebrow}</p>
      <h3 className="mt-2 text-2xl font-bold text-[#17110d]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#6b625a]">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function StatCard({ label, value, tone = "light" }) {
  const className =
    tone === "dark"
      ? "rounded-[30px] bg-[#2f190f] p-5 text-white shadow-[0_18px_40px_rgba(47,25,15,0.18)]"
      : "rounded-[30px] border border-[#eadfce] bg-white p-5 shadow-[0_18px_40px_rgba(32,18,10,0.05)]";
  return (
    <div className={className}>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-[#d9bc66]" : "text-[#b88f28]"}`}>{label}</p>
      <p className={`mt-3 text-4xl font-bold ${tone === "dark" ? "text-white" : "text-[#17110d]"}`}>{value}</p>
    </div>
  );
}

export function RecordCard({ title, meta, body, extra, onEdit, onDelete }) {
  return (
    <article className="rounded-[26px] border border-[#efe4d4] bg-[#fcfaf6] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h4 className="text-lg font-bold text-[#17110d]">{title}</h4>
          <p className="mt-1 text-sm text-[#8a7f74]">{meta}</p>
          {extra && <p className="mt-2 break-words text-sm text-[#7a5d1d]">{extra}</p>}
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={onEdit} className={secondaryButtonClass}>Edit</button>
          <button type="button" onClick={onDelete} className="inline-flex h-11 items-center justify-center rounded-[16px] border border-red-200 bg-white px-5 text-sm font-semibold text-red-600 transition hover:bg-red-50">Delete</button>
        </div>
      </div>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#645b54]">{body}</p>
    </article>
  );
}

export function Field({ label, children }) {
  return <label className="grid gap-2"><span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6d5632]">{label}</span>{children}</label>;
}

export function FieldInline({ label, children }) {
  return <label className="grid gap-2"><span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7d6a50]">{label}</span>{children}</label>;
}

export function ToggleRow({ checked, onChange, label }) {
  return <label className="flex items-center justify-between gap-4 rounded-[20px] border border-[#e7dccd] bg-[#fcfaf6] px-4 py-4"><span className="text-sm font-semibold text-[#3a1d11]">{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-[#c39a31]" /></label>;
}

export function FlashMessage({ tone, message }) {
  const classes = tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700";
  return <div className={`rounded-[20px] border px-4 py-3 text-sm ${classes}`}>{message}</div>;
}

export function ShowcaseCard({ label, value }) {
  return <div className="rounded-[24px] border border-white/10 bg-white/6 p-5"><p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p><p className="mt-3 text-sm font-semibold leading-7 text-white">{value}</p></div>;
}

export function SummaryTile({ label, value, note, emphasis = false }) {
  return (
    <div className={`rounded-[22px] border px-4 py-4 ${emphasis ? "border-[#dec48a] bg-[#fbf3df]" : "border-[#eadfce] bg-[#fcfaf6]"}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8c6b20]">{label}</p>
      <p className={`mt-2 font-bold text-[#17110d] ${emphasis ? "text-3xl" : "text-lg leading-7 break-words"}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-[#6a6058] break-words">{note}</p>
    </div>
  );
}

export function InfoStrip({ title, value, detail }) {
  return <div className="rounded-[28px] border border-[#eadfce] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(32,18,10,0.05)]"><p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#ba8f2a]">{title}</p><p className="mt-3 text-3xl font-bold text-[#17110d]">{value}</p><p className="mt-2 text-sm leading-6 text-[#6a6058]">{detail}</p></div>;
}

export const inputClass = "h-14 w-full rounded-[18px] border border-[#e7dccd] bg-[#fcfaf6] px-4 text-[15px] text-[#111] outline-none transition duration-300 focus:border-[#c39a31] focus:bg-white focus:ring-1 focus:ring-[#c39a31]";
export const textAreaClass = "w-full rounded-[18px] border border-[#e7dccd] bg-[#fcfaf6] px-4 py-4 text-[15px] text-[#111] outline-none transition duration-300 focus:border-[#c39a31] focus:bg-white focus:ring-1 focus:ring-[#c39a31]";
export const selectClass = "h-11 rounded-[16px] border border-[#e5d6c1] bg-[#fcfaf6] px-4 text-sm font-semibold text-[#2f190f] outline-none transition focus:border-[#c39a31] focus:bg-white";
export const primaryButtonClass = "inline-flex h-11 items-center justify-center rounded-[16px] bg-[#c39a31] px-5 text-sm font-semibold text-white transition hover:bg-[#ac8628] disabled:cursor-not-allowed disabled:opacity-70";
export const secondaryButtonClass = "inline-flex h-11 items-center justify-center rounded-[16px] border border-[#dfcfb8] bg-white px-5 text-sm font-semibold text-[#2f190f] transition hover:bg-[#f7f0e5]";
