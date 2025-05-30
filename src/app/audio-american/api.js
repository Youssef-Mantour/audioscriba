export async function generateAudio(inputText, selectedVoice, responseFormat) {
  try {
    const response = await fetch("https://api.lemonfox.ai/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer Dz0IFPHdVJ2R16m0ol6Vo28Rp0Qi5Cic",
      },
      body: JSON.stringify({
        input: inputText,
        voice: selectedVoice,
        response_format: responseFormat,
        language: "en-us",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // since it's not JSON
      console.error("API Error Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob(); // ✅ correctly handle binary
    return URL.createObjectURL(audioBlob);   // ✅ return blob URL to play in <audio>
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}
