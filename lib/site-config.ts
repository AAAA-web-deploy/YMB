/** Edit this file only for token configuration. Never infer a contract address. */
const contractAddress: string = process.env.NEXT_PUBLIC_TOKEN_CA || ""; // Or paste YOUR 0x... CA here.
const xUrl = "https://x.com/YouMissedBitch";
const tgUrl = "https://t.me/ymb2026";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

if (contractAddress && !/^0x[0-9a-fA-F]{40}$/.test(contractAddress)) {
  throw new Error("Set contractAddress to a valid 42-character Ethereum address or leave it empty.");
}

const isConfigured = contractAddress !== "";
const chartUrl = isConfigured
  ? `https://dexscreener.com/ethereum/${contractAddress}`
  : "https://dexscreener.com/ethereum";

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
  chartUrl,
  chartEmbedUrl: isConfigured ? `${chartUrl}?embed=1&theme=dark&trades=0&info=0` : "about:blank",
  videoUrl: "https://www.youtube.com/embed/70K8WWdAkfo?start=4&rel=0",
} as const;
