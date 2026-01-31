import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { convertText, normalizeText, TextStyle, processPasteEvent } from '../utils/converter';

const Editor: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleApplyStyle = (style: TextStyle) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return; // No text selected

    const selectedText = text.substring(start, end);
    const converted = convertText(selectedText, style);

    const newText = text.substring(0, start) + converted + text.substring(end);
    setText(newText);
    
    // Restore selection to the modified text range
    setTimeout(() => {
        textarea.focus();
        // Adjust end pointer for strikethrough which doubles char count
        const lengthDiff = converted.length - selectedText.length;
        textarea.setSelectionRange(start, end + lengthDiff);
    }, 0);
  };

  const handleClearFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
        setText(normalizeText(text));
        return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
        // If nothing selected, normalize everything
        setText(normalizeText(text));
    } else {
        const selectedText = text.substring(start, end);
        const normalized = normalizeText(selectedText);
        const newText = text.substring(0, start) + normalized + text.substring(end);
        setText(newText);
        
        setTimeout(() => {
            textarea.focus();
            const lengthDiff = normalized.length - selectedText.length;
            textarea.setSelectionRange(start, end + lengthDiff);
        }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Stop default paste
    
    const processedText = processPasteEvent(e);
    
    // Insert processed text at cursor
    const textarea = textareaRef.current;
    if (!textarea) {
        setText(processedText);
        return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Replace current selection (or insert at cursor) with processed text
    const newText = text.substring(0, start) + processedText + text.substring(end);
    setText(newText);

    // Update cursor to end of pasted content
    setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.focus();
        textarea.setSelectionRange(start + processedText.length, start + processedText.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-md sticky top-0 z-10">
        <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
            <Button 
            onClick={() => handleApplyStyle('bold')} 
            label="𝐁" 
            title="Bold (Serif)" 
            />
            <Button 
            onClick={() => handleApplyStyle('italic')} 
            label="𝐼" 
            title="Italic (Serif)" 
            />
        </div>

        <div className="flex items-center gap-1 border-r border-slate-300 pr-2 mr-1">
            <Button 
            onClick={() => handleApplyStyle('boldSans')} 
            label="𝗕" 
            title="Bold (Sans-Serif)" 
            />
            <Button 
            onClick={() => handleApplyStyle('italicSans')} 
            label="𝘪" 
            title="Italic (Sans-Serif)" 
            />
        </div>

        <Button 
          onClick={() => handleApplyStyle('doubleStruck')} 
          label="𝔹" 
          title="Double Struck (Blackboard Bold)" 
        />
        <Button 
          onClick={() => handleApplyStyle('script')} 
          label="𝒞" 
          title="Script (Cursive)" 
        />
        <Button 
          onClick={() => handleApplyStyle('monospace')} 
          label="𝙼" 
          title="Monospace" 
        />
        <Button 
          onClick={() => handleApplyStyle('strikethrough')} 
          label="S̶" 
          title="Strikethrough" 
        />

        <div className="flex-grow"></div>
         <Button 
          onClick={handleClearFormat} 
          label="Clear" 
          variant="toolbar"
          title="Clear formatting"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
          }
        />
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
            ref={textareaRef}
            className="w-full min-h-[200px] p-4 text-lg text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent outline-none resize-none transition-shadow"
            placeholder="Type here, or paste from ChatGPT / Google Docs..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={handlePaste}
        />
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-slate-500">
           {text.length} characters
        </div>
        <Button 
            onClick={handleCopy} 
            label={copied ? "Copied!" : "Copy for LinkedIn"} 
            variant="primary"
            icon={copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            )}
        />
      </div>
    </div>
  );
};

export default Editor;