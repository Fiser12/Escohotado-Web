import Link from "next/link";
import { SearchIcon } from "@/components/assets/icons";
export function OpenModalButton() {
  return (
    <div className="border rounded border-gray-200 py-1.5 px-3">
      <Link href="/search" className="flex gap-2 text-gray-500 items-center justify-center">
        <SearchIcon />
        <p className="font-body text-sm hidden md:block">
          Buscar
        </p>
      </Link>
    </div>
  );
}
