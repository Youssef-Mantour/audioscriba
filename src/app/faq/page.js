"use client";

import { useState } from "react";
import { Box, Typography, Divider, List, ListItem, ListItemText, Button } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const faqs = [
  {
    question: "What is Text-to-Speech (TTS)?",
    answer: "Text-to-Speech (TTS) technology converts written text into spoken words using synthetic voices."
  },
  {
    question: "How accurate is the voice generated by your TTS SaaS?",
    answer: "Our TTS SaaS uses advanced AI models that produce highly realistic and natural-sounding voices."
  },
  {
    question: "Can I customize the voice?",
    answer: "Yes, you can adjust the pitch, speed, and tone of the voice to match your preferences."
  },
  {
    question: "Do you support multiple languages?",
    answer: "Yes, we support several languages, including English, Spanish, French, German, and more."
  },
  {
    question: "Is your service available for both personal and commercial use?",
    answer: "Yes, our service is suitable for both personal projects and commercial applications."
  },
  {
    question: "Can I download the generated audio files?",
    answer: "Absolutely! You can download your audio files in various formats, including MP3 and WAV."
  },
  {
    question: "Do I need an API key to use the service?",
    answer: "Yes, to integrate the service into your applications, you'll need to sign up and get an API key."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a free trial with limited features so you can test our service before committing."
  },
  
  {
    question: "How do I contact support for issues?",
    answer: "You can reach our support team through email or live chat on our website for assistance."
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <List>
        {faqs.map((faq, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <ListItem button onClick={() => handleExpand(index)}>
              <ListItemText primary={faq.question} />
              {expandedIndex === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {expandedIndex === index && (
              <Box sx={{ pl: 2, pb: 2 }}>
                <Typography variant="body2">{faq.answer}</Typography>
              </Box>
            )}

            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}
