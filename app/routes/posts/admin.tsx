import { LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useTransition } from "@remix-run/react";

import { getPosts } from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  if(user.email !== "sonar@sonar.com") {
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }
  return json({ posts: await getPosts() });
};

export default function PostAdmin() {
  const { posts } = useLoaderData<LoaderData>();

  const transition = useTransition();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
            {transition.submission ? (
              <li>
                <Link to={transition.submission.formData.get("slug") as string} className="text-blue-600 underline">
                  {transition.submission.formData.get("title") as string}
                </Link>
              </li>
            ) : null}
          </ul>
          <br />
          <ul>
            <Link to="new" className="text-blue-600 underline">
              Create a New Post
            </Link>
          </ul>
        </nav>

        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
