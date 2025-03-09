import Link from "next/link";

export function SlideLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <div className="mt-4">
      {links.map((link, index) =>
        link.href.startsWith("http") ? (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base sm:text-md text-blue-300 leading-relaxed"
          >
            {link.label}
          </a>
        ) : (
          <a
            key={index}
            href={link.href}
            className="text-base sm:text-md text-blue-300 leading-relaxed"
          >
            {link.label}
          </a>
        )
      )}
    </div>
  );
}
