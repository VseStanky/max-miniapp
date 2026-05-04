import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const { name, phone, comment, product, source } = req.body ?? {};

  if (!name || !phone) {
    return res.status(400).json({ ok: false, message: "name and phone are required" });
  }

  const AMO_SUBDOMAIN = process.env.AMO_SUBDOMAIN!;
  const AMO_TOKEN = process.env.AMO_TOKEN!;

  const leadName = [
    product ? `Заявка: ${product}` : "Заявка из MAX mini app",
    comment ? ` | ${comment}` : "",
    ` | ${source || "MAX mini app"}`
  ].join("");

  const body = [
    {
      name: leadName,
      _embedded: {
        contacts: [
          {
            name: name,
            custom_fields_values: [
              {
                field_code: "PHONE",
                values: [{ value: phone, enum_code: "WORK" }]
              }
            ]
          }
        ]
      }
    }
  ];

  try {
    const amoRes = await fetch(
      `https://${AMO_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AMO_TOKEN}`
        },
        body: JSON.stringify(body)
      }
    );

    const amoText = await amoRes.text();

    if (!amoRes.ok) {
      console.error("amoCRM error:", amoText);
      return res.status(500).json({ ok: false, message: "amoCRM error", detail: amoText });
    }

    return res.status(200).json({ ok: true, message: "Заявка успешно отправлена" });
  } catch (err: any) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}