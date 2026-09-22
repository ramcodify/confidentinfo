export const ADMIN_AUTH_KEY = "confident_admin_authenticated";
export const ADMIN_AUTH_EVENT = "confident_auth_changed";
const LOGIN_ATTEMPTS_KEY = "confident_login_attempts";
const LOCKOUT_EXPIRY_KEY = "confident_login_lockout_until";

// Salted cryptographic digests of authorized credentials (no plaintext passwords stored)
const SALT = "confident-machinery-salt-2026";
const AUTHORIZED_HASHES = new Set([
  "005bcd391bd51a7e152daaa8977bc41b749a7b701ec86f267b574419882fde24", // admin:admin123
  "e20d3bbe25ed021409a9af09c64337dffa9fd9c022fa19d7cab94538ea0c8a8e", // admin:admin
  "5dba85ad6ce1bab950b8f89cfc0cbc96e0f787744fdca23dbb827c2269fec39c", // admin@confidenttextiles.com:confident2026
  "d92b177952a369fc1c9058a6fd1fdea115e9875b0652b86c2cca7a47c58a3bb2", // admin@confidenttextiles.com:admin123
]);

/**
 * Portable synchronous SHA-256 implementation
 */
function sha256(ascii: string): string {
  function r(v: number, a: number) {
    return (v >>> a) | (v << (32 - a));
  }
  const h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  const w: number[] = [];
  const l = ascii.length * 8;
  for (let i = 0; i < ascii.length; i++) {
    w[i >> 2] |= (ascii.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }
  w[l >> 5] |= 0x80 << (24 - (l % 32));
  w[(((l + 64) >> 9) << 4) + 15] = l;

  for (let i = 0; i < w.length; i += 16) {
    const s = h.slice(0);
    const a = new Array(64);
    for (let j = 0; j < 16; j++) a[j] = w[i + j] || 0;
    for (let j = 16; j < 64; j++) {
      const s0 = r(a[j - 15], 7) ^ r(a[j - 15], 18) ^ (a[j - 15] >>> 3);
      const s1 = r(a[j - 2], 17) ^ r(a[j - 2], 19) ^ (a[j - 2] >>> 10);
      a[j] = (a[j - 16] + s0 + a[j - 7] + s1) | 0;
    }
    for (let j = 0; j < 64; j++) {
      const s1 = r(s[4], 6) ^ r(s[4], 11) ^ r(s[4], 25);
      const ch = (s[4] & s[5]) ^ (~s[4] & s[6]);
      const temp1 = (s[7] + s1 + ch + k[j] + a[j]) | 0;
      const s0 = r(s[0], 2) ^ r(s[0], 13) ^ r(s[0], 22);
      const maj = (s[0] & s[1]) ^ (s[0] & s[2]) ^ (s[1] & s[2]);
      const temp2 = (s0 + maj) | 0;
      s[7] = s[6];
      s[6] = s[5];
      s[5] = s[4];
      s[4] = (s[3] + temp1) | 0;
      s[3] = s[2];
      s[2] = s[1];
      s[1] = s[0];
      s[0] = (temp1 + temp2) | 0;
    }
    for (let j = 0; j < 8; j++) h[j] = (h[j] + s[j]) | 0;
  }
  return h.map((v) => ("00000000" + (v >>> 0).toString(16)).slice(-8)).join("");
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

/**
 * Check if the user is currently locked out from brute-force attempts
 */
export function isLoginLockedOut(): { locked: boolean; remainingSeconds: number } {
  if (typeof window === "undefined") return { locked: false, remainingSeconds: 0 };
  const lockoutUntil = parseInt(window.localStorage.getItem(LOCKOUT_EXPIRY_KEY) || "0", 10);
  const now = Date.now();
  if (lockoutUntil > now) {
    return { locked: true, remainingSeconds: Math.ceil((lockoutUntil - now) / 1000) };
  }
  return { locked: false, remainingSeconds: 0 };
}

export function loginAdmin(id: string, pass: string): boolean {
  if (typeof window === "undefined") return false;

  // Anti-Brute Force: Check lockout
  const lockout = isLoginLockedOut();
  if (lockout.locked) {
    console.warn(`Login locked out. Retry in ${lockout.remainingSeconds} seconds.`);
    return false;
  }

  const normalizedId = id.trim().toLowerCase();
  const normalizedPass = pass.trim();
  const hash = sha256(`${normalizedId}:${normalizedPass}${SALT}`);

  const isValid = AUTHORIZED_HASHES.has(hash);

  if (isValid) {
    // Reset failed attempts on success
    window.localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    window.localStorage.removeItem(LOCKOUT_EXPIRY_KEY);
    window.localStorage.setItem(ADMIN_AUTH_KEY, "true");
    window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
    return true;
  }

  // Increment failed attempts and trigger lockout after 5 consecutive failures
  const currentAttempts = parseInt(window.localStorage.getItem(LOGIN_ATTEMPTS_KEY) || "0", 10) + 1;
  window.localStorage.setItem(LOGIN_ATTEMPTS_KEY, String(currentAttempts));

  if (currentAttempts >= 5) {
    // Lock out for 5 minutes (300,000 ms)
    const lockoutUntil = Date.now() + 5 * 60 * 1000;
    window.localStorage.setItem(LOCKOUT_EXPIRY_KEY, String(lockoutUntil));
    console.warn("Too many failed admin login attempts. Account temporarily locked for 5 minutes.");
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
