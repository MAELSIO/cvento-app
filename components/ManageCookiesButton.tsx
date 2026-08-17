"use client";

export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem("cvento_consent");
        location.reload();
      }}
      className="mt-2 rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white"
    >
      Gérer mes préférences cookies
    </button>
  );
}
