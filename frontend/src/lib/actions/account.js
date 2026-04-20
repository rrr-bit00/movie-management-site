'use server'

import { redirect } from "next/navigation";
import { deleteSession, fetchWithAuth } from "../session";

export async function deleteAccount() {
  const res = await fetchWithAuth("/users/me", {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "アカウント削除に失敗しました");
  }

  await deleteSession();
  redirect("/");
}
