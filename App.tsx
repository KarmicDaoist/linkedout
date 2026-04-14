import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Footer from './components/Footer';

const STYLES = [
  { name: 'Bold Serif', example: '𝐀𝐁𝐂', unicode: 'U+1D400' },
  { name: 'Italic Serif', example: '𝐴𝐵𝐶', unicode: 'U+1D434' },
  { name: 'Bold Sans', example: '𝗔𝗕𝗖', unicode: 'U+1D5D4' },
  { name: 'Italic Sans', example: '𝘈𝘈𝘊', unicode: 'U+1D608' },
  { name: 'Script', example: '𝒜ℬ𝒞', unicode: 'U+1D49C' },
  { name: 'Monospace', example: '𝙰𝙱𝙲', unicode: 'U+1D670' },
  { name: 'Double Struck', example: '𝔸𝔹ℂ', unicode: 'U+1D538' },
  { name: 'Strikethrough', example: 'A̶B̶C̶', unicode: 'U+0336' },
];

const FAQSchema = [
  {
    q: 'Can you make text bold in LinkedIn?',
    a: 'LinkedIn does not support rich-text editing, but you can use Unicode bold characters to create bold-looking text in your posts. LinkedOut converts regular letters into 𝐁𝐨𝐥𝐝 Unicode characters that display as bold when pasted into LinkedIn posts.',
  },
  {
    q: 'Does LinkedOut work with ChatGPT markdown?',
    a: 'Yes. When you paste text from ChatGPT, LinkedOut automatically detects and converts markdown formatting: **bold**, _italic_, ~~strike~~, and `code` into their Unicode equivalents.',
  },
  {
    q: 'Can I paste from Google Docs and keep bold or italic formatting?',
    a: 'Yes. LinkedOut detects bold, italic, strikethrough, and code styles from pasted Google Docs content and converts them to the matching Unicode text styles.',
  },
  {
    q: 'What Unicode text styles does LinkedOut support?',
    a: 'LinkedOut supports eight Unicode text styles: Bold Serif, Italic Serif, Bold Sans-Serif, Italic Sans-Serif, Script, Monospace, Double-Struck, and Strikethrough.',
  },
  {
    q: 'Will formatted text work when pasted into LinkedIn?',
    a: 'Yes. Unicode bold, italic, and other styled characters paste correctly into LinkedIn posts, comments, and messages and display on desktop and mobile.',
  },
  {
    q: 'Can I format only part of my post?',
    a: 'Yes. Select the words you want to style in the editor and click a style button. Only the selected text will be converted.',
  },
  {
    q: 'Is Unicode text accessible for screen readers?',
    a: 'Screen readers may read Unicode mathematical symbols letter-by-letter. Use Unicode styles for short emphasis like names, job titles, or callouts. Avoid formatting full paragraphs.',
  },
  {
    q: 'Is LinkedOut free to use?',
    a: 'Yes. LinkedOut Formatter is completely free. No account, no login, no data stored. It runs entirely in your browser.',
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0a66c2] focus:text-white focus:rounded focus:font-medium">Skip to content</a>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Hero */}
        <section className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Turn AI Text Into LinkedIn Bold
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
              Paste from ChatGPT, Claude, or Google Docs. LinkedOut auto-converts markdown and rich text into LinkedIn-ready Unicode bold, italic, script, and more.
            </p>
            <p className="text-sm text-slate-500">
              Free. No login. Copy and post.
            </p>
          </div>
        </section>

        {/* Tool */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <Editor />
          </div>
        </section>

        {/* Supported Styles */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Supported Unicode Text Styles</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STYLES.map((style) => (
                <div key={style.name} className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-2xl mb-1 font-serif">{style.example}</div>
                  <div className="text-xs text-slate-500">{style.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">{style.unicode}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Screen reader note:</strong> Unicode text styles may be read letter-by-letter. Use for short emphasis like names, job titles, or callouts only. Avoid formatting full paragraphs.
              </p>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#0a66c2] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">Paste from ChatGPT, Claude, or Google Docs</h3>
                  <p className="text-sm text-slate-600 mb-2">LinkedOut auto-detects markdown formatting (<code className="bg-slate-100 px-1 rounded">**bold**</code>, <code className="bg-slate-100 px-1 rounded">_italic_</code>) and rich text from documents.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-3 text-sm">
                    <div className="text-slate-500 text-xs mb-1">Input (from ChatGPT):</div>
                    <div className="text-slate-800">**Hiring** for senior engineers. Must know _React_ and `Node.js`.</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#0a66c2] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">Text Converts Automatically</h3>
                  <p className="text-sm text-slate-600 mb-2">Markdown and rich text styles are converted to Unicode characters instantly on paste.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-3 text-sm">
                    <div className="text-slate-500 text-xs mb-1">Output (for LinkedIn):</div>
                    <div className="text-slate-800">𝐇𝐢𝐫𝐢𝐧𝐠 for senior engineers. Must know 𝐼𝑡𝑎𝑙𝑖𝑐 and 𝙼𝚘𝚗𝚘 text.</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#0a66c2] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">Copy and Paste Into LinkedIn</h3>
                  <p className="text-sm text-slate-600">Click <strong>Copy for LinkedIn</strong> and paste directly into your LinkedIn post, comment, or message.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {FAQSchema.map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-medium text-slate-800 mb-2">{item.q}</h3>
                  <p className="text-sm text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="container mx-auto px-4 py-8 max-w-4xl pb-12">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Best Uses for Unicode Text</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-[#0a66c2] mt-0.5">✓</span>
                <span><strong>Job postings:</strong> 𝐇𝐢𝐫𝐢𝐧𝐠, 𝐒𝐞𝐧𝐢𝐨𝐫 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0a66c2] mt-0.5">✓</span>
                <span><strong>Achievements:</strong> 𝗜𝗻𝗰𝗿𝗲𝗮𝘀𝗲𝗱 𝗿𝗲𝘃𝗲𝗻𝘂𝗲 𝗯𝘆 40%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0a66c2] mt-0.5">✓</span>
                <span><strong>Callouts:</strong> ⚠️ 𝗡𝗼𝘁𝗲: deadline extended</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0a66c2] mt-0.5">✓</span>
                <span><strong>Names and titles:</strong> 𝒮𝒶𝓇𝒶𝒽, 𝒟𝑒𝓋𝑒𝓁𝑜𝓅𝑒𝓇</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0a66c2] mt-0.5">✓</span>
                <span><strong>Code snippets:</strong> 𝙪𝙨𝙚𝙎𝙩𝙖𝙩𝙚, 𝙛𝙚𝙩𝙘𝙝()</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Unicode text works in LinkedIn posts, comments, and messages. Keep emphasis short — 1 to 3 words — for the best effect.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
