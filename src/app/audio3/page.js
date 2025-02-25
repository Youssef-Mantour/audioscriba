'use client';

import { useState, useEffect } from 'react';

export default function page() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (text) {
      const timeoutId = setTimeout(() => {
        handleTextToSpeech(text);
      }, 100); // Adds a slight delay to prevent speaking too fast while typing

      return () => clearTimeout(timeoutId);
    }
  }, [text]);

  const handleTextToSpeech = (text) => {
    if (!text) return;

    setLoading(true);

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female'); // You can choose another voice
      speechSynthesis.speak(utterance);

      utterance.onend = () => setLoading(false); // Stop loading after the speech is finished

    } catch (error) {
      console.error('Error with SpeechSynthesis:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-2">Text-to-Speech Streaming</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        className="w-full border p-2"
        placeholder="Start typing to hear the speech..."
      />
      <p className="text-sm mt-1">Characters: {text.length}</p>
      {loading && <p>Processing...</p>}
    </div>
  );
}
