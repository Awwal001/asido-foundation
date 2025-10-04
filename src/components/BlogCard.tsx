import { BlogPost } from "@/utils/blog-data";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";


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
        <h3 className="text-[15px] md:text-[25px] font-bold text-[#202124] mb-3">
          {post.title}
        </h3>
        
        <LinkButton href={post.readMoreLink} label="Read More" className="mt-auto" />
      </div>
    </article>
  )
}