import { SearchIcon } from "../icons/search_icon";
import Link from "next/link";

export function OpenModalButton() {
  return (    
    <Link href="/search">
      <SearchIcon/>
    </Link>
  );
}
