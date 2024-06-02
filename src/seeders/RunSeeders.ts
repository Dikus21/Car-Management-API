import { readdir } from 'fs/promises';
import path from 'path';
import dataSource from "../config/Database";

const seedersPath = path.join(__dirname, './');

async function runSeeders() {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");

    try {
        const files = await readdir(seedersPath);
        for (const file of files) {
            if (file.endsWith('.ts') && file !== 'runSeeders.ts') {
                const { default: seederFunction } = await import(`./${file}`);
                if (typeof seederFunction === 'function') {
                    await seederFunction();
                    console.log(`${file} executed successfully.`);
                }
            }
        }
    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        await dataSource.destroy();
        console.log("Data Source has been destroyed!");
    }
}

runSeeders();
