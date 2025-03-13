import { redirect, notFound } from "next/navigation";

export function restrictInProduction(show404 = true) {
  if (process.env.NODE_ENV === "production") {
    show404 ? notFound() : redirect("/");
  }
}
