import { Link } from "@remix-run/react";

export default function AdminSlugIndex() {
  return (
    <main className="mx-auto flex justify-center">
      <Link to="delete">
        delete
      </Link>
    </main>
  );
}
