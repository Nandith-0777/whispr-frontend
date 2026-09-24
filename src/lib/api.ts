const API_BASE_URL = "http://127.0.0.1:8000";

export async function registerUser(username: string) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}

export async function getCurrentUser(token: string) {
  const response = await fetch(
    `${API_BASE_URL}/auth/me?token=${encodeURIComponent(token)}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Session is invalid");
  }

  return data;
}