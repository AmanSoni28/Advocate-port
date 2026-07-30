"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext.jsx";
import { useHomeContent } from "@/components/HomeContentProvider.jsx";
import { pick } from "@/lib/pickField";
import { imageUrl } from "@/lib/imageUrl";

export default function FeaturedCases(){

const { lang } = useLanguage();
const { featuredCases } = useHomeContent();
const items = featuredCases.items || [];

return(

<section className="relative py-10 overflow-hidden bg-white">

    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full"></div>

<div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full"></div>

<div className="container">


{/* Heading */}

<div className="text-center mb-16">

<span
className="
uppercase
tracking-[4px]
text-[#D4AF37]
font-semibold
text-sm
"
>

{pick(featuredCases, "eyebrow", lang)}

</span>

<h2
className="
heading-font
text-[#07172E]
text-3xl
md:text-4xl
xl:text-5xl
font-bold
mt-4
"
>

{pick(featuredCases, "heading", lang)}

</h2>

<p
className="
max-w-2xl
mx-auto
mt-6
leading-8
text-gray-600
"
>

{pick(featuredCases, "paragraph", lang)}

</p>

<div className="flex justify-center items-center gap-3 mt-7">

<div className="w-20 h-[2px] bg-[#D4AF37]/30"></div>

<div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>

<div className="w-20 h-[2px] bg-[#D4AF37]/30"></div>

</div>

<Link
href="/case-studies"
className="inline-flex items-center gap-2 mt-7 text-[#D4AF37] font-semibold hover:text-[#07172E] transition-colors duration-300"
>
{pick(featuredCases, "viewAll", lang)}
<ArrowUpRight size={18} />
</Link>

</div>

<div
className="
grid
gap-8
sm:grid-cols-2
xl:grid-cols-4
"
>

{

items.map((item,index)=>(

<Link

href="/case-studies"

key={item._id || index}

className="
group
bg-white
rounded-2xl
overflow-hidden
border
border-[#E7E2D7]
shadow-[0_15px_45px_rgba(0,0,0,.08)]
hover:border-[#D4AF37]
hover:shadow-[0_25px_60px_rgba(212,175,55,.16)]
transition-all
duration-300
"

>

{/* Image */}
<div
className="
relative
overflow-hidden
h-56
"
>

<Image

src={imageUrl(item.imageId) || "/images/case1.png"}

alt={pick(item, "title", lang)}

fill

className="
object-cover
"

/>

<div
className="
absolute
inset-0
"
></div>

<div
className="
pointer-events-none
absolute
inset-0
transition-opacity
duration-500
group-hover:bg-white/10
group-hover:opacity-100
"
></div>

</div>

{/* Content */}
<div className="p-6">

<h3
className="
text-[#07172E]
font-bold
text-xl
"
>

{pick(item, "title", lang)}

</h3>

<p
className="
mt-4
leading-7
text-gray-600
text-[15px]
"
>

{pick(item, "desc", lang)}

</p>

<div
className="
mt-6
flex
justify-between
items-center
"
>

<span
className="
text-[#D4AF37]
font-semibold
"
>

{pick(featuredCases, "viewCase", lang)}

</span>

<div
className="
w-12
h-12
rounded-full
border
border-[#D4AF37]
flex
items-center
justify-center
transition-colors
duration-300
group-hover:bg-[#D4AF37]
"
>

<ArrowUpRight
size={18}
className="
text-[#D4AF37]
group-hover:text-white
transition-colors
duration-300
"
/>

</div>

</div>

</div>

</Link>

))

}

</div>

{/* Cards */}

</div>

</section>

)

}
