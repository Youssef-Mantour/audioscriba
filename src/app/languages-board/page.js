"use client";
import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Flag from "react-world-flags";

export default function LanguageBord() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedOption, setSelectedOption] = useState("");

  const navItems = [
    { label: "American", code: "en-us", country: "US" },
    { label: "British", code: "en-br", country: "GB" },
    { label: "French", code: "fr", country: "FR" },
    { label: "Spanish", code: "es", country: "ES" },
    { label: "Italian", code: "it", country: "IT" },
    { label: "Portuguese", code: "pt-br", country: "PT" },
    { label: "Hindi", code: "hi", country: "IN" },
    { label: "Chinese", code: "ch", country: "CN" },
    { label: "Japanese", code: "ja", country: "JP" },
  ];

  // Load initial language from query param (e.g., ?lang=en-us)
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang) {
      setSelectedOption(lang);
    } else {
      // Default to American if no lang query
      const defaultLang = navItems[0].code;
      setSelectedOption(defaultLang);
      router.replace(`${pathname}?lang=${defaultLang}`, { shallow: true });
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedOption(selectedLang);
    router.push(`${pathname}?lang=${selectedLang}`, { shallow: true });
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <Select value={selectedOption} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          Select a language
        </MenuItem>
        {navItems.map((item) => (
          <MenuItem key={item.code} value={item.code}>
            <Flag
              code={item.country}
              style={{ width: 24, height: 16, marginRight: 10 }}
            />
            {item.label}
          </MenuItem>
        ))}
      </Select>

      {/* Example: render content based on selected language */}
      <Box sx={{ mt: 2 }}>
        {selectedOption && (
          <p>Selected Language: <strong>{selectedOption.toUpperCase()}</strong></p>
        )}
      </Box>
    </Box>
  );
}
