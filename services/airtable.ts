import Airtable from "airtable";
import { config } from "@/lib/config";

interface MemorialRecord {
  memberName: string;
  description: string;
}

const base = new Airtable({ apiKey: config.airtable.apiKey }).base(
  config.airtable.baseId
);

export async function createMemorialRecord({
  memberName,
  description,
}: MemorialRecord): Promise<string> {
  try {
    const records = await base(config.airtable.tableName).create([
      {
        fields: {
          Name: memberName,
          Description: description,
        },
      },
    ]);

    return records[0].getId();
  } catch (error) {
    console.error("Error creating Airtable record:", error);
    throw new Error("Failed to create memorial record");
  }
}
