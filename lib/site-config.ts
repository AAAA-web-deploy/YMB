/** Edit this file only for token configuration. Never infer a contract address. */
const contractAddress: string =
  process.env.NEXT_PUBLIC_TOKEN_CA || "0x350169fd652d074d33dcf60e2c51037a1a63d7dd";
const dexscreenerUrl = "https://dexscreener.com/ethereum/0x20f343df0177a4ad21e9b0d58df49fe01b9c0789";
const dextoolsUrl = "https://www.dextools.io/app/ether/pair-explorer/0x20f343df0177a4ad21e9b0d58df49fe01b9c0789";
const xUrl = "https://x.com/YouMissedBitch";
const tgUrl = "https://t.me/ymb2026";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

if (contractAddress && !/^0x[0-9a-fA-F]{40}$/.test(contractAddress)) {
  throw new Error("Set contractAddress to a valid 42-character Ethereum address or leave it empty.");
}

const isConfigured = contractAddress !== "";

export const siteConfig = {
  name: "You Missed Bitches",
  ticker: "YMB",
  ca: contractAddress || "TBA",
  isConfigured,
  xUrl,
  xHandle: `@${new URL(xUrl).pathname.split("/").filter(Boolean)[0] || "YMB"}`,
  tgUrl,
  tgHandle: `@${new URL(tgUrl).pathname.split("/").filter(Boolean)[0] || "ymb2026"}`,
  buyUrl: isConfigured
    ? `https://app.uniswap.org/swap?chain=mainnet&outputCurrency=${contractAddress}`
    : "https://app.uniswap.org/swap?chain=mainnet",
  dexscreenerUrl,
  dextoolsUrl,
  chartUrl: dexscreenerUrl,
  chartEmbedUrl: `${dexscreenerUrl}?embed=1&theme=dark&trades=0&info=0`,
  videoUrl: "https://www.youtube.com/embed/70K8WWdAkfo?start=4&rel=0",
} as const;
