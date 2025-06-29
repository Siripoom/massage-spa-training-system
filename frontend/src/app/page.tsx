"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin dashboard for now
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-600 mb-4">
          กำลังโหลด...
        </div>
        <div className="text-sm text-gray-400">
          RelaxPlus Training Management System
        </div>
      </div>
    </div>
  );
}
