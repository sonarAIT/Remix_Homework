import { ActionFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { deletePost } from "~/models/post.server";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.slug, "params.slug is required");
  await deletePost(params.slug);

  return redirect("/posts/admin");
};

export default function PostDelete() {
  return (
    <Form method="post">
      <main>
        <label className="mx-auto flex justify-center items-center">
          <span className="mr-5 text-2xl">本当に削除しますか？笑</span>
          <button
            type="submit"
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
          >
            Delete
          </button>
        </label>
      </main>
    </Form>
  );
}
