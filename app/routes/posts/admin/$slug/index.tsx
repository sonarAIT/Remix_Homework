import { Link } from "@remix-run/react";

export default function AdminSlugIndex() {
  return (
    <main className="mx-auto flex justify-center">
      <Link to="delete" className="text-blue-500 underline mx-4">
        delete
      </Link>
      <Link to="update" className="text-blue-500 underline mx-4">
        update
      </Link>
    </main>
  );
}
