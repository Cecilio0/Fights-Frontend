import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/fighters">Fighters</Link>
        </li>
      </ul>
    </div>
  );
}
