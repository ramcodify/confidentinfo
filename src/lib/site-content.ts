import { useEffect, useState } from "react";
import founderPortraitDefault from "../assets/founder-portrait.jpg";
import globalPortHeroDefault from "../assets/global-port-hero.jpg";
import industryTerminalDefault from "../assets/industry-terminal.jpg";
import tradeProductsDefault from "../assets/trade-products.jpg";
import warehouseOperationsDefault from "../assets/warehouse-operations.jpg";

export type SiteContent = {
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    badgeText: string;
    heroImage: string;
  };
  founder: {
    name: string;
    role: string;
    portrait: string;
    quote: string;
    storyParagraph1: string;
    storyParagraph2: string;
  };
  media: {
    globalPortHero: string;
    industryTerminal: string;
    warehouseOperations: string;
    tradeProducts: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    kicker: "CONFIDENT TEXTILES MACHINERY · EST. 2012",
    title: "GLOBAL TEXTILE MACHINERY & INDUSTRIAL COMMERCE.",
    subtitle:
      "Engineered precision weaving, spinning lines, and high-velocity international supply chain corridors connecting world textile capitals with verified milestone accountability.",
    badgeText: "CERTIFIED MACHINERY & TRADE DESK",
    heroImage: globalPortHeroDefault,
  },
  founder: {
    name: "Ariana Salim",
    role: "Founder & Managing Director · Trade Desk Lead",
    portrait: founderPortraitDefault,
    quote:
      "Global trade cannot be managed from behind a screen. You must know the mill floor, the container yard, and the captains moving your machines.",
    storyParagraph1:
      "Founded in 2012 by Ariana Salim, Confident Textiles Machinery began with a single conviction: international textile machinery procurement and commodity trade demand unwavering physical verification and engineering discipline over speculative digital brokerage.",
    storyParagraph2:
      "Over fourteen years of disciplined capital deployment and direct terminal oversight, Confident has expanded from Indian manufacturing corridors to premier logistics hubs across Jebel Ali, Rotterdam, Singapore, and Houston.",
  },
  media: {
    globalPortHero: globalPortHeroDefault,
    industryTerminal: industryTerminalDefault,
    warehouseOperations: warehouseOperationsDefault,
    tradeProducts: tradeProductsDefault,
  },
  contact: {
    email: "contact@confidenttextiles.com",
    phone: "+971 4 881 4400",
    address: "Terminal 2, Jebel Ali Free Zone, Dubai, United Arab Emirates",
    hours: "Monday – Saturday: 08:00 – 18:00 GST",
  },
};

const CONTENT_STORAGE_KEY = "confident-textiles-site-content";
const CONTENT_CHANGE_EVENT = "confident-site-content-updated";

export function getSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }
  try {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!saved) return defaultSiteContent;
    const parsed = JSON.parse(saved);
    return {
      hero: { ...defaultSiteContent.hero, ...parsed.hero },
      founder: { ...defaultSiteContent.founder, ...parsed.founder },
      media: { ...defaultSiteContent.media, ...parsed.media },
      contact: { ...defaultSiteContent.contact, ...parsed.contact },
    };
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(next: SiteContent): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(CONTENT_CHANGE_EVENT, { detail: next }));
  }
}

export function resetSiteContent(): SiteContent {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_CHANGE_EVENT, { detail: defaultSiteContent }));
  }
  return defaultSiteContent;
}

export function subscribeToSiteContent(callback: (content: SiteContent) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<SiteContent>;
    callback(custom.detail ?? getSiteContent());
  };

  window.addEventListener(CONTENT_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CONTENT_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useSiteContent(): {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
} {
  const [content, setContent] = useState<SiteContent>(() => getSiteContent());

  useEffect(() => {
    setContent(getSiteContent());
    return subscribeToSiteContent((next) => setContent(next));
  }, []);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    const next = updater(content);
    setContent(next);
    saveSiteContent(next);
  };

  const handleReset = () => {
    const fresh = resetSiteContent();
    setContent(fresh);
  };

  return {
    content,
    updateContent,
    resetContent: handleReset,
  };
}
