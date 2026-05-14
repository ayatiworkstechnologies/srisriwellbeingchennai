"use client";

import { useId, useState } from "react";
import { Eye, EyeOff, X, CheckCircle2, AlertCircle, Pencil, Trash2, MoreVertical, Plus } from "lucide-react";

/* ─────────────────────────────────────────────
   Design tokens (exported as Tailwind strings)
───────────────────────────────────────────── */
export const inputClass =
  "h-10 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] transition focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/15";

export const textAreaClass =
  "w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] transition focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/15";

export const selectClass =
  "h-10 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/15 cursor-pointer";

export const primaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#1a6b4a] px-4 text-sm font-semibold text-white transition hover:bg-[#15573c] disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-4 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]";

/* ─────────────────────────────────────────────
   EntityPanel
───────────────────────────────────────────── */
export function EntityPanel({
  eyebrow,
  title,
  subtitle,
  renderFields,
  checked,
  onToggleChange,
  editingId,
  setEditingId,
  setForm,
  initialForm,
  onSubmit,
  isSubmitting,
  saveLabel,
  listingTitle,
  listingSubtitle,
  items,
  renderItem,
  hideForm = false,
  actionLabel,
  onAction,
  headerContent,
}) {
  if (hideForm) {
    return (
      <section className="grid gap-6">
        <PanelCard eyebrow={eyebrow} title={listingTitle} subtitle={listingSubtitle}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
            <p className="text-sm text-[#64748b] font-medium">{subtitle}</p>
            {actionLabel && onAction ? (
              <button 
                type="button" 
                onClick={onAction} 
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0f172a] px-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-black"
              >
                <Plus className="h-4 w-4" />
                {actionLabel}
              </button>
            ) : null}
          </div>

          {headerContent ? <div className="mt-4">{headerContent}</div> : null}

          {items.length === 0 ? (
            <EmptyState message="No records found. Start by creating a new entry." />
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-1 xl:grid-cols-2">{items.map(renderItem)}</div>
          )}
        </PanelCard>
      </section>
    );
  }

  return (
    <section className="grid gap-8 2xl:grid-cols-[450px_1fr]">
      <div className="sticky top-[7.5rem] h-fit">
        <PanelCard eyebrow={eyebrow} title={title} subtitle={subtitle}>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="space-y-5">{renderFields}</div>

            <div className="pt-2">
              <ToggleRow checked={checked} onChange={onToggleChange} label="Publish to public website" />
            </div>

            <div className="flex flex-wrap gap-3 border-t border-[#f1f5f9] pt-5">
              <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                {isSubmitting ? "Saving…" : editingId ? `Update ${saveLabel}` : `Create ${saveLabel}`}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(initialForm);
                  }}
                  className={secondaryButtonClass}
                >
                  Discard
                </button>
              ) : null}
            </div>
          </form>
        </PanelCard>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-1 border-b border-[#f1f5f9] pb-4">
          <h3 className="text-xl font-bold text-[#0f172a]">{listingTitle}</h3>
          <p className="text-sm text-[#64748b] font-medium">{listingSubtitle}</p>
        </div>

        {items.length === 0 ? (
          <EmptyState message="No records found. Start by creating a new entry." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">{items.map(renderItem)}</div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EmptyState
───────────────────────────────────────────── */
function EmptyState({ message }) {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-[#d1d5db] bg-[#f9fafb] px-6 py-12 text-center">
      <p className="text-sm text-[#9ca3af]">{message}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PanelCard
───────────────────────────────────────────── */
export function PanelCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm md:p-6">
      {eyebrow && (
        <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1a6b4a]">
          {eyebrow}
        </span>
      )}
      {title && (
        <h3 className="mt-3 text-lg font-semibold text-[#111827]">{title}</h3>
      )}
      {subtitle && (
        <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   StatCard
───────────────────────────────────────────── */
export function StatCard({ label, value, tone = "light" }) {
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-xl border p-5 ${
        dark ? "border-[#1a6b4a] bg-[#1a6b4a] text-white" : "border-[#e5e7eb] bg-white"
      }`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-white/70" : "text-[#9ca3af]"}`}>
        {label}
      </p>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-[#111827]"}`}>
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RecordCard
───────────────────────────────────────────── */
export function RecordCard({ title, meta, body, extra, onEdit, onDelete }) {
  const metaParts = meta.split("|").map((part) => part.trim()).filter(Boolean);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition duration-200 hover:border-[#cbd5e1] hover:shadow-md">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h4 className="text-base font-bold text-[#0f172a] leading-tight">{title}</h4>
              {metaParts[0] ? (
                <span className="inline-flex rounded-md bg-[#f0faf5] px-2 py-0.5 text-[10px] font-bold text-[#1a6b4a] uppercase tracking-wider">
                  {metaParts[0]}
                </span>
              ) : null}
            </div>
            {metaParts.length > 1 ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[#94a3b8]">
                {metaParts.slice(1).map((part, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-[#e2e8f0]"></span>}
                    <span>{part}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex shrink-0 gap-1.5 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={onEdit}
              title="Edit record"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#1a6b4a]"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              title="Delete record"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#fee2e2] bg-white text-[#dc2626] transition hover:bg-[#fef2f2]"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {body ? (
          <div className="mt-4 border-t border-[#f1f5f9] pt-3">
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#64748b] font-medium">
              {body}
            </p>
          </div>
        ) : null}

        {extra ? (
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">
            <span className="truncate max-w-[200px] rounded-md bg-[#fafafa] border border-[#f1f5f9] px-2 py-1">
              {extra}
            </span>
          </div>
        ) : null}
      </div>
      
      {/* Mobile-only visible actions */}
      <div className="flex gap-1 border-t border-[#f1f5f9] sm:hidden p-2 bg-[#fafafa]">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 flex h-8 items-center justify-center gap-2 rounded-lg border border-[#e2e8f0] bg-white text-[10px] font-bold uppercase tracking-widest text-[#64748b]"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex-1 flex h-8 items-center justify-center gap-2 rounded-lg border border-[#fee2e2] bg-white text-[10px] font-bold uppercase tracking-widest text-[#dc2626]"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </button>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Field
───────────────────────────────────────────── */
export function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-[#374151]">{label}</span>
      {children}
    </label>
  );
}

export function FieldInline({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-[#374151]">{label}</span>
      {children}
    </label>
  );
}

/* ─────────────────────────────────────────────
   PasswordInput
───────────────────────────────────────────── */
export function PasswordInput({ value, onChange, placeholder, required = false, autoComplete }) {
  const inputId = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={inputId}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#374151]"
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ToggleRow
───────────────────────────────────────────── */
export function ToggleRow({ checked, onChange, label }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition ${
        checked ? "border-[#a7f3d0] bg-[#f0faf5]" : "border-[#e5e7eb] bg-[#f9fafb]"
      }`}
    >
      <span className="text-sm font-medium text-[#374151]">{label}</span>
      <div className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${checked ? "bg-[#1a6b4a]" : "bg-[#d1d5db]"}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <div className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${checked ? "translate-x-4" : ""}`} />
      </div>
    </label>
  );
}

/* ─────────────────────────────────────────────
   FlashMessage
───────────────────────────────────────────── */
export function FlashMessage({ tone, message }) {
  const error = tone === "error";

  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm ${
        error
          ? "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]"
          : "border-[#a7f3d0] bg-[#f0faf5] text-[#15803d]"
      }`}
    >
      {error ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ToastStack
───────────────────────────────────────────── */
export function ToastStack({ toasts, onDismiss }) {
  if (!toasts?.length) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[140] grid w-[min(92vw,360px)] gap-2.5">
      {toasts.map((toast) => {
        const error = toast.tone === "error";
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-xl border shadow-lg ${
              error
                ? "border-[#fecaca] bg-white text-[#dc2626]"
                : "border-[#a7f3d0] bg-white text-[#15803d]"
            }`}
          >
            <div className="flex items-start gap-3 px-4 py-3.5">
              {error ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <p className="flex-1 text-sm font-medium leading-5">{toast.message}</p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 text-current opacity-50 transition hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className={`h-0.5 w-full ${error ? "bg-[#fca5a5]" : "bg-[#6ee7b7]"}`} />
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ShowcaseCard
───────────────────────────────────────────── */
export function ShowcaseCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#111827]">{value}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SummaryTile
───────────────────────────────────────────── */
export function SummaryTile({ label, value, note, emphasis = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 transition ${
        onClick ? "cursor-pointer hover:shadow-sm" : ""
      } ${
        emphasis ? "border-[#a7f3d0] bg-[#f0faf5]" : "border-[#e5e7eb] bg-white"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">{label}</p>
      <p className={`mt-2 font-bold tracking-tight text-[#111827] ${emphasis ? "text-2xl" : "text-xl"}`}>
        {value}
      </p>
      {note ? <p className="mt-1.5 text-xs text-[#6b7280]">{note}</p> : null}
    </div>
  );
}

/* ─────────────────────────────────────────────
   InfoStrip
───────────────────────────────────────────── */
export function InfoStrip({ title, value, detail }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <span className="inline-flex rounded-md bg-[#f0faf5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1a6b4a]">
        {title}
      </span>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[#111827]">{value}</p>
      <p className="mt-1.5 text-sm text-[#6b7280]">{detail}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FormModal
───────────────────────────────────────────── */
export function FormModal({ open, title, subtitle, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#f3f4f6] px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">Editor</p>
            <h3 className="mt-1 text-xl font-semibold text-[#111827]">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#9ca3af] transition hover:bg-[#f9fafb] hover:text-[#374151]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
