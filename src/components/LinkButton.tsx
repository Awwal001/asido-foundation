import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function LinkButton({ href, label, className = "" }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors group uppercase tracking-wide text-sm ${className}`}
    >
      {label}
      <span className="ml-2 mr-1 group-hover:hidden transition-all duration-300">{'>'}</span>
      <span className="ml-2 mr-1 hidden group-hover:inline transition-all duration-300">→</span>
    </Link>
  );
}
