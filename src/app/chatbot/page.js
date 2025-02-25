const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/chatbot/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        console.error("Error from backend:", response.status, response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("Backend Response:", data); // ✅ Debugging
  
      if (!data.reply) {
        console.error("Missing 'reply' in response:", data);
        return;
      }
  
      setMessages([...newMessages, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  