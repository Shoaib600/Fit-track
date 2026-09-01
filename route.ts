import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { food, quantity = 100 } = body;

    if (!food || typeof food !== "string") {
      return NextResponse.json({ error: "Food name is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "No exact match, and GROQ_API_KEY is not configured for an AI estimate — you can still enter the numbers yourself below.",
        },
        { status: 200 }
      );
    }

    const prompt = `You are a nutrition expert. Estimate the macros for the following food.
Food: "${food}"
Quantity: ${quantity} grams

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{"calories": number, "protein": number, "carbs": number, "fat": number}

Be realistic and accurate based on standard nutritional data.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You reply only with valid JSON. No extra text." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq error:", errText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Enter values manually." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON
    const match = content.match(/\{[\s\S]*?\}/);
    if (!match) {
      return NextResponse.json(
        { error: "Could not parse AI response. Enter values manually." },
        { status: 200 }
      );
    }

    const parsed = JSON.parse(match[0]);
    return NextResponse.json({
      calories: Math.round(Number(parsed.calories) || 0),
      protein: Math.round((Number(parsed.protein) || 0) * 10) / 10,
      carbs: Math.round((Number(parsed.carbs) || 0) * 10) / 10,
      fat: Math.round((Number(parsed.fat) || 0) * 10) / 10,
    });
  } catch (err) {
    console.error("Estimate error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Enter values manually." },
      { status: 200 }
    );
  }
}
