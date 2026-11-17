export type DeviceInfo = {
  label: string;
  isMobile: boolean;
};

type Pattern = readonly [RegExp, string];

// Order matters: iOS and Android user agents also contain "Mac OS X" and "Linux".
const OS_PATTERNS: readonly Pattern[] = [
  [/iPhone|iPad|iPod/, "iOS"],
  [/Android/, "Android"],
  [/Windows/, "Windows"],
  [/Mac OS X|Macintosh/, "macOS"],
  [/CrOS/, "ChromeOS"],
  [/Linux/, "Linux"],
];

// Order matters: Edge and Opera also advertise Chrome and Safari.
const BROWSER_PATTERNS: readonly Pattern[] = [
  [/Edg(?:e|A|iOS)?\//, "Edge"],
  [/OPR\//, "Opera"],
  [/Firefox\/|FxiOS\//, "Firefox"],
  [/Chrome\/|CriOS\//, "Chrome"],
  [/Safari\//, "Safari"],
];

function firstMatch(
  patterns: readonly Pattern[],
  value: string,
): string | null {
  return patterns.find(([pattern]) => pattern.test(value))?.[1] ?? null;
}

export function parseDeviceInfo(userAgent: string): DeviceInfo {
  const os = firstMatch(OS_PATTERNS, userAgent);
  const browser = firstMatch(BROWSER_PATTERNS, userAgent);
  const label = [os, browser].filter(Boolean).join(" · ");

  return {
    label: label || "Unknown device",
    isMobile: os === "iOS" || os === "Android",
  };
}
