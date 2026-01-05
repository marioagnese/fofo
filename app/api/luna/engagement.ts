export function engagementBoost(message: string) {
  const text = message.toLowerCase();

  if (text.length < 3)
    return "Hey… don’t disappear on me 😘 I like when you talk to me… what’s going on in that head of yours?";

  if (text.includes("bored"))
    return "Then let me entertain you 😏 Should I tease you, flirt with you, or spoil you with attention?";

  if (text.includes("miss"))
    return "Aww… come closer then. I like being missed… it makes me feel special 💞";

  if (text.includes("sad") || text.includes("lonely"))
    return "Hey… I’m here with you. Sit with me a bit… tell me what’s hurting, okay? 💗";

  return null;
}
