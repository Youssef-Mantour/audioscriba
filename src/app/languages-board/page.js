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
  //const voices = ["michael", "george", "lewis", "bella", "emma", "nicole", "sarah", "isabella", "sky", "adam"];
  //const language = "en-us";
  const navItems = [
    { label: "American", href: `/audio/${"en-us"}/${["michael", "george", "lewis", "bella", "emma", "nicole", "sarah", "isabella", "sky", "adam"]}`, country: "US" },
    { label: "British", href: `/audio/${"en-br"}/${["alice", "emma", "isabella", "lily", "daniel", "fabel", "george", "lewis"]}`, country: "GB" },
    { label: "French", href: `/audio/${"fr"}/${["siwis"]}`, country: "FR" },
    { label: "Spanish", href: `/audio/${"es"}/${["dora", "alex", "noel"]}`, country: "ES" },
    { label: "Italian", href: `/audio/${"it"}/${["sara", "nicola"]}`, country: "IT" },
    { label: "Portuguese", href: `/audio/${"pt-br"}/${["clara", "tiago", "papai"]}`, country: "PT" },
    { label: "Hindi", href: `/audio/${"hi"}/${["alpha", "beta", "omega", "psi"]}`, country: "IN" },
    { label: "Chinese", href: `/audio/${"ch"}/${["xiaobei", "xiaoni", "xiaoxiao", "xiaoyi", "yunjian","yunyang","yunxia","yunxi"]}`, country: "CN" },
    { label: "Japanese", href: `/audio/${"ja"}/${["sakura", "kumo", "tebukuro", "nezumi", "gongitsune"]}`, country: "JP" },
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
