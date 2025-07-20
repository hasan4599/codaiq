'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { server } from "@/url";

export function EmptyState() {

  return (
    <Link
      href={`${server}/projects/new`}
      className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="w-20 h-20 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
        <FontAwesomeIcon icon={faRocket} className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Create Your First Site</h3>
      <p className="text-gray-400 mb-8 max-w-md">
        Get started by creating your first website. Our AI-powered builder will help you create a professional NEXTJS site in minutes.
      </p>
    </Link>
  );
}
