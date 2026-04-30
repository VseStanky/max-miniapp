import type { Item } from "../types/catalog";

export type QuoteFormData = {
  name: string;
  phone: string;
  email: string;
  company: string;
  comment: string;
};

export type QuoteRequestPayload = {
  source: "max-miniapp";
  requestType: "quote";
  createdAt: string;
  lead: {
    name: string;
    pipelineCode: string;
    tags: string[];
  };
  contact: {
    name: string;
    phone: string;
    email: string;
    company: string;
  };
  request: {
    productId: string | null;
    productName: string | null;
    productUrl: string | null;
    comment: string;
  };
};

export type QuoteSubmitResult = {
  ok: boolean;
  mode: "backend" | "mock";
  message?: string;
  leadId?: number;
  contactId?: number | null;
};

const QUOTE_ENDPOINT = "https://vsestanky.ru/api/quote.php";

export function buildQuotePayload(
  form: QuoteFormData,
  item: Item | null
): QuoteRequestPayload {
  return {
    source: "max-miniapp",
    requestType: "quote",
    createdAt: new Date().toISOString(),
    lead: {
      name: item ? `Запрос КП: ${item.name}` : "Запрос КП со страницы каталога",
      tags: ["MAX", "Mini App", "КП"],
      pipelineCode: "SITE_REQUESTS",
    },
    contact: {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
    },
    request: {
      productId: item?.id ?? null,
      productName: item?.name ?? null,
      productUrl: item?.url ?? null,
      comment: form.comment.trim(),
    },
  };
}

export async function submitQuoteRequest(
  payload: QuoteRequestPayload
): Promise<QuoteSubmitResult> {
  const response = await fetch(QUOTE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    throw new Error("Сервер вернул не JSON");
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `Ошибка сервера: ${response.status}`;

    throw new Error(message);
  }

  const result =
    typeof data === "object" && data !== null
      ? (data as {
          ok?: boolean;
          message?: string;
          leadId?: number;
          contactId?: number | null;
        })
      : null;

  return {
    ok: Boolean(result?.ok),
    mode: "backend",
    message: result?.message,
    leadId: result?.leadId,
    contactId: result?.contactId ?? null,
  };
}