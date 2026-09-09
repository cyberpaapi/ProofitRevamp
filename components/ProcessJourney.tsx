"use client";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import Reveal from "./Reveal";
export default function ProcessJourney({ steps }: { steps: {title:string;desc:string}[] }) {
  const arrowId = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const container=root.current, line=path.current, icon=marker.current, canvas=svg.current;
    if(!container || !line || !icon || !canvas) return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf=0;
    function measure() {
      if(!container || !line || !canvas) return;
      const width=container.clientWidth,height=container.clientHeight;
      canvas.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const mobile=width<700;
      const points=Array.from(container.querySelectorAll(':scope > ol > li')).map((el,i)=>({x:mobile ? 18 : width*(i%2 ? .38 : .62),y:(el as HTMLElement).offsetTop+(el as HTMLElement).offsetHeight/2}));
      let d='';points.forEach((p,i)=>{if(!i) d=`M ${p.x} ${p.y}`;else {const prev=points[i-1],mid=(prev.y+p.y)/2;d+=` C ${prev.x} ${mid}, ${p.x} ${mid}, ${p.x} ${p.y}`;}});
      line.setAttribute('d',d);render();
    }
    function render() {
      raf=0;if(!container || !line || !icon) return;
      const bounds=container.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,(innerHeight*.5-bounds.top)/bounds.height));
      const point=line.getPointAtLength(line.getTotalLength()*progress);
      icon.style.transform=`translate(${point.x-28}px,${point.y-28}px)`;
      icon.style.visibility=reduced?'hidden':'visible';
    }
    const schedule=()=>{if(!raf) raf=requestAnimationFrame(render);};
    const ro=new ResizeObserver(measure);ro.observe(container);measure();window.addEventListener('scroll',schedule,{passive:true});
    return()=>{ro.disconnect();cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);};
  },[steps.length]);
  return <section className="py-16 md:py-20"><div ref={root} className="relative mx-auto max-w-6xl px-4">
    <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden><defs><marker id={arrowId} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="#f7941d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker></defs><path ref={path} fill="none" stroke="#f7941d" strokeWidth="2" strokeDasharray="7 6" markerMid={`url(#${arrowId})`} markerEnd={`url(#${arrowId})`} /></svg>
    <div ref={marker} className="pointer-events-none absolute left-0 top-0 z-20 h-14 w-14 overflow-hidden rounded-full border-4 border-brand bg-ink shadow-lg" aria-hidden><Image src="/images/thermal-camera-screen.webp" alt="" fill sizes="56px" className="object-cover" /></div>
    <ol className="space-y-14 md:space-y-20">{steps.map((step,i)=><Reveal as="li" key={step.title} className={`relative ml-9 rounded-2xl border border-brand/25 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg motion-reduce:transform-none md:ml-0 md:w-[44%] ${i%2 ? 'md:!ml-auto' : ''}`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl"><Image src={`/images/process-${i+1}.webp`} alt={step.title} fill sizes="(min-width:768px) 480px, 90vw" quality={85} className="object-cover object-top" /></div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-brand-deep">Step {String(i+1).padStart(2,'0')}</p><h2 className="mt-2 text-2xl font-semibold">{step.title}</h2><p className="mt-3 leading-relaxed text-ink-soft">{step.desc}</p>
    </Reveal>)}</ol>
  </div></section>;
}
