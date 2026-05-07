import { ImLeaf } from "react-icons/im";

export default function LeafGlyph({ className = "h-5 w-5", strokeClassName = "" }) {
  return <ImLeaf aria-hidden="true" className={`${className} text-[#d0a93d]`.trim()} />;
}
