export const config = {
  airtable: {
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    baseId: "apphc6uxrHRK6s5m8",
    tableName: "MemorialMessenger",
  },
} as const;
