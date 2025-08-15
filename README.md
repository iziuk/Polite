# Polite

**Polite** is a modern web/PWA application that helps users quickly find, play, and read ready-made phrases for various
real-life situations — such as visiting a market, dealing with an auto service, or going to a pharmacy. The goal is to
make communication in a foreign language easier by providing phonetic hints, audio playback, and ready-to-use templates.

## ✨ Features

- 🔍 **Search phrases** by keyword.
- 🔊 **Text-to-Speech (TTS)** playback for correct pronunciation.
- 🗣 **Phonetic hints** for confident speaking.
- 📦 **Multiple language packs**.
- 🆘 **“Please repeat slowly”** quick button.
- 📱 **Fully responsive** design for mobile and desktop.

## 🛠 Tech Stack

- **Framework:** Next.js + TypeScript
- **Styling:** TailwindCSS
- **Audio:** Web Speech API

## 🚀 Getting Started

```bash
git clone https://github.com/izyuk/Polite
cd polite
npm install
npm run dev
```

## 📂 Repository Structure

```
polite/
├── public/            # Static assets
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   ├── data/          # Phrase data packs
│   └── utils/         # Utility functions
├── .eslintrc.js       # ESLint config
├── .prettierrc        # Prettier config
├── package.json       # Dependencies & scripts
├── README.md          # Project documentation
└── tsconfig.json      # TypeScript config
```

## 📌 Roadmap (MVP Stage)

1. Create a **private** GitHub repository.
2. Set up Next.js + TypeScript.
3. Integrate TailwindCSS and configure global styles.
4. Add ESLint + Prettier setup.
5. Implement main page with category listing.
6. Build phrase display component with TTS and phonetic hint.
7. Add search functionality.
8. Deploy to Vercel for initial testing.

## 📜 License

MIT — feel free to use, modify, and share with attribution.

