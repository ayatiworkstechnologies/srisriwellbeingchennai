"use client";

import { useId, useState } from "react";

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
}) {
  if (hideForm) {
    return (
      <section className="grid gap-6">
        <PanelCard eyebrow={eyebrow} title={listingTitle} subtitle={listingSubtitle}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-relaxed text-[#5f726c]">{subtitle}</p>
            {actionLabel && onAction ? (
              <button type="button" onClick={onAction} className={primaryButtonClass}>
                {actionLabel}
              </button>
            ) : null}
          </div>

          {items.length === 0 ? (
            <EmptyState message="No records found. Start by creating a new entry." />
          ) : (
            <div className="mt-8 grid gap-5">{items.map(renderItem)}</div>
          )}
        </PanelCard>
      </section>
    );
  }

  return (
    <section className="grid gap-8 2xl:grid-cols-[460px_1fr]">
      <div className="sticky top-28 h-fit">
        <PanelCard eyebrow={eyebrow} title={title} subtitle={subtitle}>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="space-y-5">{renderFields}</div>

            <div className="pt-2">
              <ToggleRow checked={checked} onChange={onToggleChange} label="Publish to public website" />
            </div>

            <div className="flex flex-wrap gap-4 border-t border-[#e3ece7] pt-4">
              <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
                {isSubmitting ? "Processing..." : editingId ? `Update ${saveLabel}` : `Create ${saveLabel}`}
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

      <div className="space-y-5">
        <div>
          <h3 className="font-serif text-3xl font-semibold tracking-tight text-[#18332e]">
            {listingTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5f726c]">{listingSubtitle}</p>
        </div>

        {items.length === 0 ? (
          <EmptyState message="No records found. Start by creating a new entry." />
        ) : (
          <div className="grid gap-5">{items.map(renderItem)}</div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ message }) {
  return (
    <div className="mt-6 rounded-[2rem] border border-dashed border-[#cfddd6] bg-[linear-gradient(180deg,#f9fcfa,#f1f7f3)] px-5 py-20 text-center">
      <p className="text-sm text-[#60746e]">{message}</p>
    </div>
  );
}

export function PanelCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-[#dbe7e1] bg-white p-6 shadow-sm md:p-7">
      <p className="inline-flex rounded-md bg-[#eef4f1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f746d]">
        {eyebrow}
      </p>
      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#1d2a26]">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#61736d]">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function StatCard({ label, value, tone = "light" }) {
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-xl border p-5 ${
        dark
          ? "border-[#1f6b5c] bg-[#1f6b5c] text-white"
          : "border-[#dbe7e1] bg-white"
      }`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${dark ? "text-white/70" : "text-[#7d948c]"}`}>
        {label}
      </p>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#18332e]"}`}>
        {value}
      </p>
    </div>
  );
}

export function RecordCard({ title, meta, body, extra, onEdit, onDelete }) {
  const metaParts = meta.split("|").map((part) => part.trim()).filter(Boolean);

  return (
    <article className="rounded-xl border border-[#dbe7e1] bg-white p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-xl font-semibold tracking-tight text-[#18332e]">{title}</h4>
            {metaParts[0] ? (
              <span className="rounded-md bg-[#eef5f1] px-2 py-1 text-[11px] font-medium text-[#19564f]">
                {metaParts[0]}
              </span>
            ) : null}
          </div>
          {metaParts.length > 1 ? (
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8ba098]">
              {metaParts.slice(1).join(" | ")}
            </p>
          ) : null}
          {extra ? (
            <div className="mt-4 inline-flex max-w-full items-center rounded-md border border-[#dbe7e1] bg-[#f7fbf8] px-3 py-2 text-xs text-[#60746e]">
              <span className="truncate">{extra}</span>
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={onEdit} className={secondaryButtonClass}>
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#f0cdc5] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b35342] transition-all duration-300 hover:bg-[#fff4f2]"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5 border-t border-[#e7efeb] pt-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#4e635d]">{body}</p>
      </div>
    </article>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6d857e]">{label}</span>
      {children}
    </label>
  );
}

export function FieldInline({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7d948c]">{label}</span>
      {children}
    </label>
  );
}

export function PasswordInput({
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
}) {
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
        className={`${inputClass} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f746d]"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export function ToggleRow({ checked, onChange, label }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 ${
        checked
          ? "border-[#b8d0c6] bg-[#f4faf6]"
          : "border-[#dbe7e1] bg-[#fbfdfc]"
      }`}
    >
      <span className="text-sm font-semibold text-[#18332e]">{label}</span>
      <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${checked ? "bg-[#19564f]" : "bg-[#c6d6d0]"}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${checked ? "translate-x-5" : ""}`} />
      </div>
    </label>
  );
}

export function FlashMessage({ tone, message }) {
  const error = tone === "error";

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm font-medium ${
        error
          ? "border-[#f0cdc5] bg-[#fff5f3] text-[#a54938]"
          : "border-[#cfe1d8] bg-[#f4faf6] text-[#19564f]"
      }`}
    >
      {message}
    </div>
  );
}

export function ShowcaseCard({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-[#dbe7e1] bg-[#f8fbf9] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7d948c]">{label}</p>
      <p className="mt-3 text-sm font-semibold text-[#18332e]">{value}</p>
    </div>
  );
}

export function SummaryTile({ label, value, note, emphasis = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 ${
        onClick ? "cursor-pointer hover:bg-[#f8fbf9]" : ""
      } ${
        emphasis
          ? "border-[#cfe1d8] bg-[#f4faf6]"
          : "border-[#dbe7e1] bg-white/90"
      }`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#7d948c]">{label}</p>
      <p className={`mt-2 tracking-tight text-[#18332e] ${emphasis ? "text-2xl font-semibold" : "text-lg font-semibold"}`}>
        {value}
      </p>
      {note ? <p className="mt-2 text-xs leading-relaxed text-[#7d948c]">{note}</p> : null}
    </div>
  );
}

export function InfoStrip({ title, value, detail }) {
  return (
    <div className="rounded-xl border border-[#dbe7e1] bg-white p-5">
      <p className="inline-flex rounded-md bg-[#eef5f1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#19564f]">
        {title}
      </p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#18332e]">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#60746e]">{detail}</p>
    </div>
  );
}

export function FormModal({ open, title, subtitle, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(16,36,33,0.36)] p-4 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#dbe7e1] bg-white shadow-[0_20px_60px_rgba(16,36,33,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#e3ece7] px-6 py-6 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6d857e]">Editor</p>
            <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#18332e]">{title}</h3>
            {subtitle ? <p className="mt-2 text-sm leading-relaxed text-[#60746e]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe7e1] bg-white text-xl text-[#18332e] transition-all duration-300 hover:bg-[#f6faf8]"
          >
            x
          </button>
        </div>
        <div className="max-h-[78vh] overflow-y-auto px-6 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}

export const inputClass =
  "h-11 w-full rounded-lg border border-[#d6e2dc] bg-white px-4 text-sm text-[#18332e] outline-none placeholder:text-[#9aaea8] focus:border-[#19564f]";
export const textAreaClass =
  "w-full rounded-lg border border-[#d6e2dc] bg-white px-4 py-3 text-sm text-[#18332e] outline-none placeholder:text-[#9aaea8] focus:border-[#19564f]";
export const selectClass =
  "h-11 rounded-lg border border-[#d6e2dc] bg-white px-3 text-sm text-[#18332e] outline-none focus:border-[#19564f] cursor-pointer";
export const primaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg bg-[#1f6b5c] px-5 text-sm font-semibold text-white hover:bg-[#175245] disabled:cursor-not-allowed disabled:opacity-70";
export const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg border border-[#d6e2dc] bg-white px-5 text-sm font-medium text-[#18332e] hover:bg-[#f6faf8]";
