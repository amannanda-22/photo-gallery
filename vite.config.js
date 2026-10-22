import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// React plugin compiles JSX; Tailwind plugin generates the utility classes.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
