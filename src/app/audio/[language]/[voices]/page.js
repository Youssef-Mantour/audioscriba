// app/audio/[language]/[voices]/page.js

import AudioGenerator from "@/components/AudioGenerator";

export default function Page({ params }) {
  const { language, voices } = params;

  // Decode and convert voices from string to array
  const decodedVoices = decodeURIComponent(voices).split(",");

  return <AudioGenerator language={language} voices={decodedVoices} />;
}
