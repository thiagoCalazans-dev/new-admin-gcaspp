import Link from "next/link";
import { Navbar } from "./navbar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-lg">
      <div className="container flex h-14 items-center">
        <Link href="/">GCASPP</Link>
        <div className="flex flex-1 items-center px-4  justify-between">
          <Navbar />
          {/* <ThemeToggle /> */}
          {/* <span>LOGOUT</span> */}
        </div>
      </div>
    </header>
  );
}
