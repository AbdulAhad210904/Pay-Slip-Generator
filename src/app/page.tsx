"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated) {
      router.push("/pay-slip-generator");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null; 
}
