import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { BlogPostContent } from './BlogPostContent';

export function generateStaticParams() {
    return (portfolioData.blogs || []).map((blog) => ({
        slug: blog.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = (portfolioData.blogs || []).find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
