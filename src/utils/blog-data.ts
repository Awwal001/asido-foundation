export interface BlogPost {
  id: number
  title: string
  image: string
  readMoreLink: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Naiia Spirit: Unique Powers of Resilience or Learned Helplessness?",
    image: "/blogs/blog1.png",
    readMoreLink: "#blog-1"
  },
  {
    id: 2,
    title: "Ignorance Around Mental Health Challenges is Expensive",
    image: "/blogs/blog2.png",
    readMoreLink: "#blog-2"
  },
  {
    id: 3,
    title: "Stretched to Breaking Point: Emotional Burden of Caring for the Elderly with Dementia",
    image: "/blogs/blog3.png",
    readMoreLink: "#blog-3"
  }
]