import { Page } from "@/types";

export default function SubMenu({ pages }: { pages: Page[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {pages.map((page, index) => (
        <a
          key={index}
          href={page.destination}
          className="mx-4 text-white hover:text-gray-300 transition-colors" 
        >
          {page.name}
        </a>
      ))}
    </div>
  )
}