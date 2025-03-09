import Link from "next/link";

export function SlideLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <div className="mt-4">
      {links.map((link, index) => (
        <span key={index} className="inline-block">
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-base sm:text-md text-blue-300 leading-relaxed"
          >
            {link.label}
          </a>
          {index < links.length - 1 && (
            <span className="mx-2 text-gray-400">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
