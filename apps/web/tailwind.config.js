/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgAlt: "#F8FAFF",
        brand: "#4F46E5",
        brand2: "#9333EA",
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        lift: "0 10px 24px rgba(17,24,39,0.10)",
        soft: "0 6px 20px rgba(17,24,39,0.06)",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
