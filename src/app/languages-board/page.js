"use client";
import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import Flag from "react-world-flags";

export default function LanguageBord() {
  const router = useRouter();
  const pathname = usePathname(); // gets the current path like /audio-french
  const [selectedOption, setSelectedOption] = useState("");

  const navItems = [
    { label: "American", href: "/audio-american", country: "US" },
    { label: "British", href: "/audio-british", country: "GB" },
    { label: "French", href: "/audio-french", country: "FR" },
    { label: "Spanish", href: "/audio-spanish", country: "ES" },
    { label: "Italian", href: "/audio-italian", country: "IT" },
    { label: "Portuguese", href: "/audio-portuguese", country: "PT" },
    { label: "Hindi", href: "/audio-hindi", country: "IN" },
    { label: "Chinese", href: "/audio-chinese", country: "CN" },
    { label: "Japanese", href: "/audio-japanese", country: "JP" },
  ];

  // Set the selectedOption based on current path on first render
  useEffect(() => {
    const current = navItems.find((item) => item.href === pathname);
    if (current) {
      setSelectedOption(current.href);
    }
  }, [pathname]);

  const handleChange = (event) => {
    const selectedHref = event.target.value;
    setSelectedOption(selectedHref);
    router.push(selectedHref);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a language
        </MenuItem>
        {navItems.map((item) => (
          <MenuItem key={item.href} value={item.href}>
            <Flag
              code={item.country}
              style={{ width: 24, height: 16, marginRight: 10 }}
            />
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
