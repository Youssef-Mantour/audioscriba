
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const { finished } = require("stream/promises");


const response = await fetch("https://api.lemonfox.ai/v1/audio/speech", {
  method: "POST",
  headers: {
    "Authorization": "Bearer Dz0IFPHdVJ2R16m0ol6Vo28Rp0Qi5Cic",
  },
  body: JSON.stringify({
    input: "Artificial intelligence is the intelligence of machines or software.",
    voice: "sarah",
    response_format: "mp3"
  })
})
const fileStream = createWriteStream("speech.mp3", { flags: "wx" });
await finished(Readable.fromWeb(response.body).pipe(fileStream));