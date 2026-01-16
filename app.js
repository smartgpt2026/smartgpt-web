async function send() {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  // User Bubble
  const userMsg = document.createElement("div");
  userMsg.className = "msg-user";
  userMsg.innerText = text;
  chat.appendChild(userMsg);
  chat.scrollTop = chat.scrollHeight;

  // Anfrage an Backend
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  const reply = data.reply || "Keine Antwort";

  // Bot Bubble
  const botMsg = document.createElement("div");
  botMsg.className = "msg-bot";
  botMsg.innerText = reply;
  chat.appendChild(botMsg);
  chat.scrollTop = chat.scrollHeight;
}
