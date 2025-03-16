'use client'
import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Grid, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const languageData = {
  English: [
    { voice: 'Voice 1', sampleUrl: 'https://www.example.com/audio/voice1.mp3' },
    { voice: 'Voice 2', sampleUrl: 'https://www.example.com/audio/voice2.mp3' },
    { voice: 'Voice 3', sampleUrl: 'https://www.example.com/audio/voice3.mp3' },
  ],
  Spanish: [
    { voice: 'Voz 1', sampleUrl: 'https://www.example.com/audio/voz1.mp3' },
    { voice: 'Voz 2', sampleUrl: 'https://www.example.com/audio/voz2.mp3' },
    { voice: 'Voz 3', sampleUrl: 'https://www.example.com/audio/voz3.mp3' },
  ],
  French: [
    { voice: 'Voix 1', sampleUrl: 'https://www.example.com/audio/voix1.mp3' },
    { voice: 'Voix 2', sampleUrl: 'https://www.example.com/audio/voix2.mp3' },
    { voice: 'Voix 3', sampleUrl: 'https://www.example.com/audio/voix3.mp3' },
  ],
};

export default function LanguageVoiceSelecto() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audio] = useState(new Audio());

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setSelectedVoice(''); // Reset voice selection when language changes
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handlePlaySample = (sampleUrl) => {
    audio.src = sampleUrl;
    audio.play();
  };

  return (
    <Grid container spacing={3} direction="column" alignItems="flex-start">
      {/* Language Selection */}
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Language</FormLabel>
          <RadioGroup
            value={selectedLanguage}
            onChange={handleLanguageChange}
            row
          >
            {Object.keys(languageData).map((language) => (
              <FormControlLabel
                key={language}
                value={language}
                control={<Radio />}
                label={language}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Voice Selection (only shows after selecting a language) */}
      {selectedLanguage && (
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Voice</FormLabel>
            <RadioGroup
              value={selectedVoice}
              onChange={handleVoiceChange}
              row
            >
              {languageData[selectedLanguage].map(({ voice, sampleUrl }, index) => (
                <Grid container key={index} alignItems="center">
                  <Grid item>
                    <FormControlLabel
                      value={voice}
                      control={<Radio />}
                      label={voice}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => handlePlaySample(sampleUrl)}
                      color="primary"
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      )}

      {/* Display the selected options */}
      {selectedLanguage && selectedVoice && (
        <Grid item>
          <p>
            Selected Language: <strong>{selectedLanguage}</strong>
          </p>
          <p>
            Selected Voice: <strong>{selectedVoice}</strong>
          </p>
        </Grid>
      )}
    </Grid>
  );
}
