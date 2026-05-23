const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

async function request(path, options = {}, requestOptions = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!response.ok) {
    if (requestOptions.allowNotFound && response.status === 404) {
      return null;
    }

    const body = await response.text();
    let parsedBody;

    try {
      parsedBody = body ? JSON.parse(body) : null;
    } catch {
      parsedBody = undefined;
    }

    console.error("Backend error response");
    console.error("HTTP status:", response.status);
    console.error("HTTP status text:", response.statusText || "-");
    console.error("Message:", parsedBody?.message ?? "-");
    console.error("Body status:", parsedBody?.status ?? "-");
    console.error("Detail:", parsedBody?.detail ?? "-");
    console.error("Raw body:", body || "-");

    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function normalizeRows(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.content)) {
    return payload.content;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}

export async function getBlasts(location) {
  const params = new URLSearchParams({ location });
  const payload = await request(`/api/blasts?${params.toString()}`);
  return normalizeRows(payload);
}

export function syncBlasts(location) {
  const params = new URLSearchParams({ location });
  return request(`/api/blasts/sync?${params.toString()}`, { method: "POST" });
}

export async function getBlastPeriodFieldSummaries(location, periods) {
  const params = new URLSearchParams({ location });

  periods.forEach((period) => {
    params.append("period", period);
  });

  const payload = await request(
    `/api/blasts/field-summaries?${params.toString()}`,
    {},
    { allowNotFound: true },
  );

  return normalizeRows(payload);
}
