import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/single-multi-accordion/",
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.js",
        include: ["src/**/*.{test,spec}.{js,jsx}"],
    },
});
