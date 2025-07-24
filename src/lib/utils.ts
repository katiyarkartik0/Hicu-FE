export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const storage = {
  get(key: string) {
    return localStorage.getItem(key);
  },
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  }
};

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "accessToken",
  MEMBER_DETAILS: "member",
};

export const isAuthenticated = (): boolean => {
  const token = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  return Boolean(token);
};

export const CONFIGURATION_ACCESS = {
  INSTAGRAM_ACCESS_TOKEN:"igAccessToken",
  INSTAGRAM_WEBHOOK_SECRET:"webhookSecret"
}