# LinkedOut Formatter 🚀

LinkedOut Formatter is a specialized text editor designed to help content creators stand out on LinkedIn, Twitter, and other social media platforms. It converts standard text into unique Unicode styles that bypass platform restrictions on bolding and italics.

## ✨ Key Features

- **Auto-Magic Paste**: 
  - **ChatGPT Ready**: Automatically detects Markdown (e.g., `**bold**`, `_italic_`, `~~strike~~`, `` `code` ``) and converts it to styled Unicode instantly.
  - **Google Docs Friendly**: Strips heavy formatting (fonts, colors, sizes) while preserving the *intent* of bold and italic text.
- **Diverse Styles**: Support for Bold (Serif/Sans), Italic (Serif/Sans), Script (Cursive), Monospace, Double Struck, and Strikethrough.
- **LinkedIn Aesthetic**: A clean, professional UI built with Tailwind CSS that feels right at home for professional networking.
- **Smart Selection**: Apply styles only to the words you highlight, or format the whole post at once.
- **One-Click Copy**: Optimized for a quick workflow—format, click copy, and post.

## 🛠 Tech Stack

- **React 19**: Utilizing modern hooks and functional components.
- **Tailwind CSS**: For a responsive, accessible, and professional interface.
- **Unicode Mapping Engine**: Custom-built utility to handle surrogate pairs and complex character mappings for social media compatibility.

## 🚀 How to Use

1. **Type or Paste**: Enter your content into the editor. If you paste from ChatGPT or a document, the formatting will be applied automatically.
2. **Manual Styling**: Highlight specific text and click a style button in the toolbar (e.g., **𝐁** for Serif Bold or **𝗕** for Sans Bold).
3. **Refine**: Use the **Clear** button to revert selected text to plain ASCII.
4. **Copy & Post**: Click **Copy for LinkedIn** to save the formatted text to your clipboard.

## ⚠️ Accessibility Disclaimer

**Please use with care.** Unicode "fonts" are actually mathematical alphanumeric symbols. While they look great to sighted users, screen readers may read them as individual mathematical symbols (e.g., "Mathematical Bold Capital H") rather than words. 

**Best Practice**: Use these styles for headlines, names, or single keywords to grab attention. Avoid using them for entire paragraphs of body text to ensure your content remains accessible to everyone.

---

*Not affiliated with LinkedIn Corporation. Built for creators by creators.*