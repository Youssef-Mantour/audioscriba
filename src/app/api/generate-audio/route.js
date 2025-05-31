export async function POST(request) {
  try {
    const { inputText, selectedVoice, responseFormat ,language} = await request.json();

    const response = await fetch("https://api.lemonfox.ai/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.LEMONFOX_API_KEY,  // Make sure your .env has LEMONFOX_API_KEY
      },
      body: JSON.stringify({
        input: inputText,
        voice: selectedVoice,
        response_format: responseFormat,
        language: language , // Default to English if no language is provided
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'inline; filename="speech.mp3"',
      },
    });

  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
