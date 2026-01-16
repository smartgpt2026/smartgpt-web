let messages = [];

async function send() {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const apiKey = document.getElementById("key").value;

  const text = input.value;
  input.value = "";

  chat.innerHTML += `<div><b>Du:</b> ${text}</div>`;
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

  chat.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
  messages.push({ role: "assistant", content: reply });

  chat.scrollTop = chat.scrollHeight;
}
