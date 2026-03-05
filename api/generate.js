export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const prompt = body?.prompt || "테스트";

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    const data = await r.json();

    const text =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.output_text ||
      JSON.stringify(data);

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "server error" });
  }
}
