let messages = [];

async function send() {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const apiKey = document.getElementById("key").value;
  const text = input.value;
  input.value = "";

  // User bubble
  const userMsg = document.createElement("div");
  userMsg.className = "msg-user";
  userMsg.innerText = text;
  chat.appendChild(userMsg);

  messages.push({ role: "user", content: text });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Keine Antwort";

  // Bot bubble
  const botMsg = document.createElement("div");
  botMsg.className = "msg-bot";
  botMsg.innerText = reply;
  chat.appendChild(botMsg);

  messages.push({ role: "assistant", content: reply });

  chat.scrollTop = chat.scrollHeight;
}
