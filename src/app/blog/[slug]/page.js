import { getAllPosts, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main className="prose mx-auto p-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
