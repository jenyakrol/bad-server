import path from "path";
import fs from "fs";

export const ensureDir = (name: string) => {
    const tempDir = path.join(process.cwd(), name);
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    return tempDir;
};