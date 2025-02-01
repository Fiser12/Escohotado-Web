"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SearchIcon } from "../icons/search_icon";

export function OpenModalButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOpenModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set("isOpenSearch", "true");
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(newUrl);
  };

  return (
    <button onClick={handleOpenModal}>
      <SearchIcon/>
    </button>
  );
}
