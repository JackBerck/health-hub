import Link from "next/link";

interface NavigationLinkProps {
  children: React.ReactNode;
  url: string;
  addClass?: string;
}

export default function NavigationLink({
  children,
  url,
  addClass,
}: NavigationLinkProps) {
  return (
    <li>
      <Link href={url} className={`block py-2 px-3 rounded ${addClass}`}>
        {children}
      </Link>
    </li>
  );
}
