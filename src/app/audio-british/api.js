// api.js
export const generateAudio = async (inputText, selectedVoice, responseFormat) => {
    try {
      const response = await fetch("https://api.lemonfox.ai/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": process.env.LEMONFOX_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText, voice: selectedVoice, response_format: responseFormat,language:"en-gb" }),
     
      });
  
      if (!response.ok) throw new Error("Failed to generate audio.");
  
      return URL.createObjectURL(await response.blob());
    } catch (error) {
      throw new Error(error.message);
      
    }
  };
  