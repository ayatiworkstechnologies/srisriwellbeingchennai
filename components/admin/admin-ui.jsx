export function EntityPanel({ eyebrow, title, subtitle, renderFields, checked, onToggleChange, editingId, setEditingId, setForm, initialForm, onSubmit, isSubmitting, saveLabel, listingTitle, listingSubtitle, items, renderItem, hideForm = false, actionLabel, onAction }) {
  if (hideForm) {
    return (
      <section className="grid gap-6">
        <PanelCard eyebrow={eyebrow} title={listingTitle} subtitle={listingSubtitle}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#7a726c]">{subtitle}</p>
            </div>
            {actionLabel && onAction ? (
              <button type="button" onClick={onAction} className={primaryButtonClass}>
                {actionLabel}
              </button>
            ) : null}
          </div>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[3rem] border border-dashed border-black/10 bg-white/40 px-5 py-24 text-center backdrop-blur-sm">
              <p className="text-sm text-[#7a726c]">No records found. Start by creating a new entry.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6">
              {items.map(renderItem)}
            </div>
          )}
        </PanelCard>
      </section>
    );
  }

  return (
    <section className="grid gap-10 2xl:grid-cols-[460px_1fr]">
      <div className="sticky top-28 h-fit">
        <PanelCard eyebrow={eyebrow} title={title} subtitle={subtitle}>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="space-y-5">
              {renderFields}
            </div>
            
            <div className="pt-2">
              <ToggleRow checked={checked} onChange={onToggleChange} label="Publish to public website" />
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-black/5">
              <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Processing...
                  </span>
                ) : editingId ? `Update ${saveLabel}` : `Create ${saveLabel}`}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className={secondaryButtonClass}>
                  Discard
                </button>
              )}
            </div>
          </form>
        </PanelCard>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-3xl font-semibold text-[#1f1a17] tracking-tight">{listingTitle}</h3>
          <p className="mt-1 text-sm text-[#7a726c] font-medium">{listingSubtitle}</p>
        </div>
        
        {items.length === 0 ? (
          <div className="rounded-[3rem] border border-dashed border-black/10 bg-white/40 px-5 py-24 text-center backdrop-blur-sm">
            <p className="text-sm text-[#7a726c]">No records found. Start by creating a new entry.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {items.map(renderItem)}
          </div>
        )}
      </div>
    </section>
  );
}

export function PanelCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-8 shadow-[0_32px_100px_rgba(32,18,10,0.06)] backdrop-blur-xl md:p-10 transition-all duration-500">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#c29a2f]/5 blur-3xl" />
      <p className="relative inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[#c29a2f] mb-4 bg-[#c29a2f]/5 px-3 py-1 rounded-full">{eyebrow}</p>
      <h3 className="relative font-serif text-[1.8rem] font-semibold leading-tight text-[#1f1a17] tracking-tight">{title}</h3>
      <p className="relative mt-4 text-[14px] leading-relaxed text-[#6f655c] font-medium">{subtitle}</p>
      <div className="relative mt-10">{children}</div>
    </section>
  );
}

export function StatCard({ label, value, tone = "light" }) {
  const isDark = tone === "dark";
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 p-6 ${
      isDark 
        ? "border-[#1f1a17]/10 bg-[linear-gradient(145deg,#1f1a17,#3d2f24)] text-white shadow-[0_24px_50px_rgba(31,26,23,0.3)]" 
        : "border-white/80 bg-white shadow-[0_12px_40px_rgba(55,38,19,0.03)]"
    }`}>
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex items-center justify-between">
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDark ? "text-white/60" : "text-[#8b7b68]"}`}>{label}</p>
          <div className={`rounded-lg p-2 ${isDark ? "bg-white/10" : "bg-[#f8f6f1]"}`}>
            <svg className={`h-4 w-4 ${isDark ? "text-white/80" : "text-[#c29a2f]"}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
        </div>
        <p className={`font-serif text-4xl font-semibold tracking-tighter ${isDark ? "text-white" : "text-[#1f1a17]"}`}>{value}</p>
      </div>
    </div>
  );
}

export function RecordCard({ title, meta, body, extra, onEdit, onDelete }) {
  return (
    <article className="group relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white p-7 shadow-[0_12px_40px_rgba(55,38,19,0.03)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(55,38,19,0.08)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-serif text-2xl font-semibold text-[#1f1a17] tracking-tight">{title}</h4>
            <span className="h-1 w-1 rounded-full bg-[#c29a2f]/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c29a2f]">{meta.split('|')[0].trim()}</p>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a0948c]">{meta.split('|').slice(1).join(' | ').trim()}</p>
          {extra && (
            <div className="mt-4 flex items-center gap-2 overflow-hidden rounded-lg bg-[#f8f6f1] px-3 py-1.5 w-fit max-w-full">
              <span className="truncate text-[11px] font-medium text-[#7a726c]">{extra}</span>
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={onEdit} className={secondaryButtonClass}>Edit</button>
          <button type="button" onClick={onDelete} className="inline-flex h-11 items-center justify-center rounded-2xl border border-red-100 bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-red-600 transition-all duration-300 hover:bg-red-50">Delete</button>
        </div>
      </div>
      <div className="mt-7 pt-6 border-t border-black/5">
        <p className="whitespace-pre-line text-[14px] leading-relaxed text-[#5c544f] font-medium">{body}</p>
      </div>
    </article>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c29a2f] ml-1">{label}</span>
      {children}
    </label>
  );
}

export function FieldInline({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a0948c] ml-1">{label}</span>
      {children}
    </label>
  );
}

export function ToggleRow({ checked, onChange, label }) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-300 ${checked ? "border-[#c29a2f]/30 bg-[#fdfaf3]" : "border-black/5 bg-black/2"}`}>
      <span className="text-sm font-bold text-[#1f1a17]">{label}</span>
      <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${checked ? "bg-[#c29a2f]" : "bg-black/10"}`}>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(event) => onChange(event.target.checked)} 
          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
        />
        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </div>
    </label>
  );
}

export function FlashMessage({ tone, message }) {
  const isError = tone === "error";
  return (
    <div className={`flex items-center gap-3 rounded-2xl border p-5 text-[13px] font-semibold ${
      isError 
        ? "border-red-200 bg-red-50 text-red-700 shadow-sm" 
        : "border-[#c29a2f]/20 bg-[#fdfaf3] text-[#9a6c12] shadow-sm"
    }`}>
      {message}
    </div>
  );
}

export function ShowcaseCard({ label, value }) {
  return <div className="rounded-2xl border border-black/5 bg-[#f8f9fa] p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#7a726c]">{label}</p><p className="mt-3 text-sm font-bold text-[#1f1a17]">{value}</p></div>;
}

export function SummaryTile({ label, value, note, emphasis = false, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-[1.6rem] border p-5 transition-all duration-500 ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${
      emphasis 
        ? "border-[#c29a2f]/20 bg-[#fdfaf3] shadow-sm" 
        : "border-white/80 bg-white/50 shadow-sm"
    }`}>
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a0948c] mb-2">{label}</p>
      <p className={`font-serif text-[#1f1a17] tracking-tight ${emphasis ? "text-2xl font-semibold" : "text-xl font-semibold leading-snug"}`}>{value}</p>
      {note && <p className="mt-2 text-[10px] leading-relaxed text-[#a08f7f] font-medium italic">{note}</p>}
    </div>
  );
}

export function InfoStrip({ title, value, detail }) {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white p-7 shadow-[0_12px_40px_rgba(32,18,10,0.04)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(32,18,10,0.08)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c29a2f] mb-4 bg-[#c29a2f]/5 px-3 py-1 rounded-full w-fit">{title}</p>
      <p className="font-serif text-4xl font-semibold text-[#1f1a17] tracking-tight">{value}</p>
      <p className="mt-4 text-[13px] leading-relaxed text-[#7a726c] font-medium">{detail}</p>
    </div>
  );
}

export function FormModal({ open, title, subtitle, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(21,14,10,0.42)] p-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,242,233,0.95))] shadow-[0_40px_120px_rgba(32,18,10,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-6 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c29a2f]">Editor</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1f1a17]">{title}</h3>
            {subtitle ? <p className="mt-2 text-sm text-[#7a726c]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white text-lg text-[#1f1a17] transition hover:bg-[#f8f6f1]"
          >
            ×
          </button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto px-6 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}

export const inputClass = "h-14 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 text-sm text-[#1f1a17] outline-none transition-all duration-300 placeholder:text-[#b6a692] focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]";
export const textAreaClass = "w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#1f1a17] outline-none transition-all duration-300 placeholder:text-[#b6a692] focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f]";
export const selectClass = "h-12 rounded-xl border border-black/10 bg-[#f8f6f1] px-4 text-sm font-semibold text-[#1f1a17] outline-none transition-all duration-300 focus:border-[#c29a2f] focus:bg-white focus:ring-1 focus:ring-[#c29a2f] cursor-pointer";
export const primaryButtonClass = "inline-flex h-12 items-center justify-center rounded-2xl bg-[#c29a2f] px-8 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#a88528] disabled:cursor-not-allowed disabled:opacity-70 shadow-lg shadow-[#c29a2f]/20";
export const secondaryButtonClass = "inline-flex h-11 items-center justify-center rounded-2xl border border-black/5 bg-[#f8f6f1] px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1f1a17] transition-all duration-300 hover:bg-[#efece4]";
