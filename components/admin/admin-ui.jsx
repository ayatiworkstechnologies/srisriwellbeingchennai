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
  headerContent,
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

          {headerContent ? <div className="mt-5">{headerContent}</div> : null}

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
    <div className="mt-6 rounded-lg border border-dashed border-[#d0d5dd] bg-[#f9fafb] px-5 py-14 text-center">
      <p className="text-sm text-[#667085]">{message}</p>
    </div>
  );
}

export function PanelCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-7">
      <p className="inline-flex rounded-md border border-[#dbeafe] bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
        {eyebrow}
      </p>
      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#101828]">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#667085]">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function StatCard({ label, value, tone = "light" }) {
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-lg border p-5 shadow-sm ${
        dark
          ? "border-[#2563eb] bg-[#2563eb] text-white"
          : "border-[#e5e7eb] bg-white"
      }`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? "text-white/75" : "text-[#667085]"}`}>
        {label}
      </p>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[#101828]"}`}>
        {value}
      </p>
    </div>
  );
}

export function RecordCard({ title, meta, body, extra, onEdit, onDelete }) {
  const metaParts = meta.split("|").map((part) => part.trim()).filter(Boolean);

  return (
    <article className="rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-xl font-semibold tracking-tight text-[#101828]">{title}</h4>
            {metaParts[0] ? (
              <span className="rounded-md bg-[#eff6ff] px-2 py-1 text-[11px] font-semibold text-[#2563eb]">
                {metaParts[0]}
              </span>
            ) : null}
          </div>
          {metaParts.length > 1 ? (
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#667085]">
              {metaParts.slice(1).join(" | ")}
            </p>
          ) : null}
          {extra ? (
            <div className="mt-4 inline-flex max-w-full items-center rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-xs text-[#667085]">
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
            className="inline-flex h-11 items-center justify-center rounded-md border border-[#fecaca] bg-white px-5 text-sm font-semibold text-[#b42318] transition hover:bg-[#fef3f2]"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-5 border-t border-[#eaecf0] pt-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#475467]">{body}</p>
      </div>
    </article>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#667085]">{label}</span>
      {children}
    </label>
  );
}

export function FieldInline({ label, children }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#667085]">{label}</span>
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
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#2563eb]"
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
          ? "border-[#bfdbfe] bg-[#eff6ff]"
          : "border-[#e5e7eb] bg-[#f9fafb]"
      }`}
    >
      <span className="text-sm font-semibold text-[#101828]">{label}</span>
      <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${checked ? "bg-[#2563eb]" : "bg-[#d0d5dd]"}`}>
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
          ? "border-[#fecaca] bg-[#fef3f2] text-[#b42318]"
          : "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
      }`}
    >
      {message}
    </div>
  );
}

export function ToastStack({ toasts, onDismiss }) {
  if (!toasts?.length) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[140] grid w-[min(92vw,380px)] gap-3">
      {toasts.map((toast) => {
        const error = toast.tone === "error";
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto overflow-hidden rounded-[1.3rem] border shadow-[0_20px_50px_rgba(16,36,33,0.16)] ${
              error
                ? "border-[#fecaca] bg-[#fef3f2] text-[#b42318]"
                : "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 px-4 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                  {error ? "Action Error" : "Action Updated"}
                </p>
                <p className="mt-2 text-sm font-medium leading-6">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current/10 bg-white/70 text-base"
              >
                x
              </button>
            </div>
            <div className={`h-1 w-full ${error ? "bg-[#fda29b]" : "bg-[#2563eb]"}`} />
          </div>
        );
      })}
    </div>
  );
}

export function ShowcaseCard({ label, value }) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#667085]">{label}</p>
      <p className="mt-3 text-sm font-semibold text-[#101828]">{value}</p>
    </div>
  );
}

export function SummaryTile({ label, value, note, emphasis = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-4 ${
        onClick ? "cursor-pointer hover:bg-[#f9fafb]" : ""
      } ${
        emphasis
          ? "border-[#bfdbfe] bg-[#eff6ff]"
          : "border-[#e5e7eb] bg-white"
      }`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#667085]">{label}</p>
      <p className={`mt-2 tracking-tight text-[#101828] ${emphasis ? "text-2xl font-semibold" : "text-lg font-semibold"}`}>
        {value}
      </p>
      {note ? <p className="mt-2 text-xs leading-relaxed text-[#667085]">{note}</p> : null}
    </div>
  );
}

export function InfoStrip({ title, value, detail }) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <p className="inline-flex rounded-md bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
        {title}
      </p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#101828]">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#667085]">{detail}</p>
    </div>
  );
}

export function FormModal({ open, title, subtitle, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#eaecf0] bg-[#f9fafb] px-6 py-6 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#667085]">Editor</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[#101828]">{title}</h3>
            {subtitle ? <p className="mt-2 text-sm leading-relaxed text-[#667085]">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#e5e7eb] bg-white text-xl text-[#101828] transition hover:bg-[#f9fafb]"
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
  "h-11 w-full rounded-md border border-[#d0d5dd] bg-white px-4 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";
export const textAreaClass =
  "w-full rounded-md border border-[#d0d5dd] bg-white px-4 py-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";
export const selectClass =
  "h-11 rounded-md border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 cursor-pointer";
export const primaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-md bg-[#2563eb] px-5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70";
export const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-md border border-[#d0d5dd] bg-white px-5 text-sm font-semibold text-[#344054] hover:bg-[#f9fafb]";
