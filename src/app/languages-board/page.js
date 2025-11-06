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
  const currentText = searchParams.get("text") || ""; // get current text from URL
  const [selectedOption, setSelectedOption] = useState("");

  const navItems = [
    {
      label: "American",
      href: "/audio/en-us",
      country: "US",
    },
    {
      label: "British",
      href: "/audio/en-br",
      country: "GB",
    },
    { label: "French", href: "/audio/fr", country: "FR" },
    { label: "Spanish", href: "/audio/es", country: "ES" },
    { label: "Italian", href: "/audio/it", country: "IT" },
    { label: "Portuguese", href: "/audio/pt-br", country: "PT" },
    { label: "Hindi", href: "/audio/hi", country: "IN" },
    { label: "Chinese", href: "/audio/ch", country: "CN" },
    { label: "Japanese", href: "/audio/ja", country: "JP" },
  ];

  useEffect(() => {
    const current = navItems.find((item) => pathname.startsWith(item.href));
    if (current) setSelectedOption(current.href);
  }, [pathname]);

  const handleChange = (event) => {
    const selectedHref = event.target.value;
    setSelectedOption(selectedHref);
    // Keep current text in URL query
    const newUrl = `${selectedHref}?text=${encodeURIComponent(currentText)}`;
    router.push(newUrl, { shallow: true });
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <Select value={selectedOption} onChange={handleChange} displayEmpty>
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
