import { BlogPost } from "@/utils/blog-data";
import Image from "next/image";

export default function BlogCard({ post }: { post: BlogPost }) {
  if (!post) {
    return null; 
  }

  return (
    <article className="bg-white overflow-hidden transition-all duration-300 h-full flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 190px, 380px"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>
      
      <div className="py-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-text-primary mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <a
          href={post.readMoreLink}
          className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors group mt-auto uppercase tracking-wide text-sm"
        >
            Read More
            <span className="mr-1 group-hover:hidden transition-all duration-300"> {'  >'}</span>
            <span className="mr-1 hidden group-hover:inline transition-all duration-300"> →</span>
        </a>
      </div>
    </article>
  )
}