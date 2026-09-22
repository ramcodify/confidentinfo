export const ADMIN_AUTH_KEY = "confident_admin_authenticated";
export const ADMIN_AUTH_EVENT = "confident_auth_changed";

export const VALID_CREDENTIALS = [
  { id: "admin", pass: "admin123" },
  { id: "admin", pass: "admin" },
  { id: "admin@confidenttextiles.com", pass: "confident2026" },
  { id: "admin@confidenttextiles.com", pass: "admin123" },
];

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function loginAdmin(id: string, pass: string): boolean {
  if (typeof window === "undefined") return false;

  const normalizedId = id.trim().toLowerCase();
  const normalizedPass = pass.trim();

  const isValid = VALID_CREDENTIALS.some(
    (cred) =>
      cred.id.toLowerCase() === normalizedId &&
      cred.pass === normalizedPass,
  );

  if (isValid) {
    window.localStorage.setItem(ADMIN_AUTH_KEY, "true");
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
    return true;
  }

  return false;
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_AUTH_KEY);
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
}

export function subscribeToAuth(callback: (isAuth: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => {
    callback(isAdminAuthenticated());
  };

  window.addEventListener(ADMIN_AUTH_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(ADMIN_AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
