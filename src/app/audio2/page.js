'use client';

import { useState } from 'react';

export default function TextToSpeechPage() {
  const [text, setText] = useState('Welcome to Nemesys Labs, we try our best to democratize state-of-the-art speech synthesis like this one, have fun!');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    // Send request to the Text-to-Speech API
    const response = await fetch('https://api.nemesyslabs.com/api/v1/text-to-speech/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer nm_sk_.JYKOtZuJc6XhPmKR_c_697517d452351d8a95c98043',
      },
      body: JSON.stringify({
        text,
        voiceId: 'Emma',
      }),
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } else {
      alert('Error generating speech');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Text-to-Speech</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <p>Character Count: {text.length}</p>
      <br />
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Processing...' : 'Convert to Speech'}
      </button>

      {audioUrl && (
        <div>
          <h2>Audio</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
