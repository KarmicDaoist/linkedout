import { MAPPINGS, INVERSE_MAP } from './mappings';
import React from 'react';

export type TextStyle = 'bold' | 'italic' | 'boldSans' | 'italicSans' | 'script' | 'monospace' | 'doubleStruck' | 'strikethrough';

export const convertText = (text: string, style: TextStyle): string => {
  if (style === 'strikethrough') {
    return text.split('').map(char => char + '\u0336').join('');
  }

  const map = MAPPINGS[style];
  if (!map) return text;

  return text.split('').map(char => map[char] || char).join('');
};

export const normalizeText = (text: string): string => {
  let cleaned = text.replace(/[\u0300-\u036f]/g, ""); 
  const chars = Array.from(cleaned);
  return chars.map(char => INVERSE_MAP[char] || char).join('');
};

// --- Paste Handling Logic ---

// Helper to check if HTML contains meaningful formatting tags or styles
const hasFormatting = (html: string): boolean => {
    return /<(b|strong|i|em|s|strike|del|code|pre)\b|style=['"](.*?)(font-weight|font-style|text-decoration)/i.test(html);
};

export const processPasteEvent = (e: React.ClipboardEvent<HTMLTextAreaElement>): string => {
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');

    // 1. Try HTML conversion if it looks formatted (e.g., Google Docs)
    if (html && hasFormatting(html)) {
        try {
            return convertHtmlToUnicode(html);
        } catch (err) {
            console.error("HTML conversion failed, falling back to markdown", err);
        }
    }

    // 2. Try Markdown conversion (e.g., ChatGPT)
    return convertMarkdownToUnicode(text);
};

const convertMarkdownToUnicode = (text: string): string => {
   let res = text;
   
   // Code: `text` -> Monospace
   res = res.replace(/`([^`\n]+)`/g, (_, c) => convertText(c, 'monospace'));
   
   // Bold: **text** or __text__ -> Bold (Serif default)
   res = res.replace(/(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g, (_, __, c) => convertText(c, 'bold'));
   
   // Italic: *text* or _text_ -> Italic (Serif default)
   // Using strict regex to avoid matching math (3*4) or snake_case
   res = res.replace(/(\*|_)(?=\S)(.+?)(?<=\S)\1/g, (_, __, c) => convertText(c, 'italic'));
   
   // Strikethrough: ~~text~~ -> Strikethrough
   res = res.replace(/~~(?=\S)(.+?)(?<=\S)~~/g, (_, c) => convertText(c, 'strikethrough'));

   return res;
};

const convertHtmlToUnicode = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    let output = '';

    // Recursive DOM walker to flatten text while preserving style context
    const walk = (node: Node, styles: { bold?: boolean, italic?: boolean, strike?: boolean, mono?: boolean }) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let content = node.textContent || '';
            
            // Apply styles (Priority: Mono > Bold > Italic)
            if (styles.mono) content = convertText(content, 'monospace');
            else if (styles.bold) content = convertText(content, 'bold');
            else if (styles.italic) content = convertText(content, 'italic');
            
            if (styles.strike) content = convertText(content, 'strikethrough');
            
            output += content;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const newStyles = { ...styles };

            // Detect styles from tags and inline CSS
            const styleAttr = el.getAttribute('style') || '';
            const tagName = el.tagName.toUpperCase();

            // Bold detection
            if (tagName === 'B' || tagName === 'STRONG' || /font-weight:\s*(bold|700|800|900)/i.test(styleAttr)) {
                newStyles.bold = true;
            }
            // Italic detection
            if (tagName === 'I' || tagName === 'EM' || /font-style:\s*italic/i.test(styleAttr)) {
                newStyles.italic = true;
            }
            // Strike detection
            if (tagName === 'S' || tagName === 'STRIKE' || tagName === 'DEL' || /text-decoration:.*?line-through/i.test(styleAttr)) {
                newStyles.strike = true;
            }
            // Monospace detection
            if (tagName === 'CODE' || tagName === 'PRE' || /font-family:.*?monospace/i.test(styleAttr)) {
                newStyles.mono = true;
            }

            const isBlock = ['P', 'DIV', 'BR', 'LI', 'TR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName);
            
            if (tagName === 'BR') {
                output += '\n';
            }

            node.childNodes.forEach(child => walk(child, newStyles));

            if (isBlock) {
                output += '\n';
            }
        }
    };

    walk(doc.body, {});
    
    // Normalize newlines (max 2 consecutive) to prevent huge gaps from block tags
    return output.replace(/\n{3,}/g, '\n\n').trim();
}