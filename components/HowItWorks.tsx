"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
type Step={title:string;image:string;intro?:string;body?:string[];points?:string[];outro?:string};
export default function HowItWorks({steps}:{steps:Step[]}) {
  const [index,setIndex]=useState(0);
  const [unpinned,setUnpinned]=useState(false);
  const root=useRef<HTMLElement>(null);
  const stage=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=stage.current;if(!el)return;
    const heading=el.querySelector<HTMLElement>('.works-heading');
    const copy=el.querySelector<HTMLElement>('.works-copy');
    if(!heading||!copy)return;
    const measure=()=>{
      const children=Array.from(copy.children);
      if(!children.length)return;
      const textHeight=children.at(-1)!.getBoundingClientRect().bottom-children[0].getBoundingClientRect().top;
      const copyStyle=getComputedStyle(copy);
      const stageStyle=getComputedStyle(el);
      const copyHeight=Math.max(parseFloat(copyStyle.minHeight)||0,textHeight+parseFloat(copyStyle.paddingTop)+parseFloat(copyStyle.paddingBottom));
      const cardHeight=innerWidth<768?copyHeight+100:Math.max(copyHeight,220);
      const required=heading.offsetHeight+cardHeight+44+2*parseFloat(stageStyle.rowGap)+parseFloat(stageStyle.paddingTop)+parseFloat(stageStyle.paddingBottom);
      setUnpinned(required>innerHeight-80);
    };
    const observer=new ResizeObserver(measure);
    observer.observe(heading);
    Array.from(copy.children).forEach(child=>observer.observe(child));
    window.addEventListener('resize',measure);measure();
    return()=>{observer.disconnect();window.removeEventListener('resize',measure);};
  },[index]);
  useEffect(()=>{
    let raf=0;
    const render=()=>{raf=0;const el=root.current;if(!el||!stage.current||getComputedStyle(stage.current).position!=='sticky')return;const travel=Math.max(1,el.offsetHeight-innerHeight);setIndex(Math.min(steps.length-1,Math.max(0,Math.floor((-el.getBoundingClientRect().top/travel)*steps.length))));};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(render);};
    render();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[steps.length]);
  function go(next:number) { const el=root.current;if(!el)return;const target=Math.max(0,Math.min(steps.length-1,next));setIndex(target);if(!stage.current||getComputedStyle(stage.current).position!=='sticky')return;window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+(target+.15)/steps.length*(el.offsetHeight-innerHeight),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
  const step=steps[index];if(!step)return null;
  return <section ref={root} className="works-scroll relative" data-unpinned={unpinned || undefined} aria-labelledby="how-proofit-works-heading" style={{height:`${100+Math.max(0,steps.length-1)*60}svh`}}>
    <div ref={stage} className="works-stage">
      <div className="works-heading w-full max-w-[1050px]">
        <h2 id="how-proofit-works-heading" className="font-display font-semibold">How PROOFIT Works?</h2>
        <p className="text-ink-soft/75">If it&apos;s worth living in, it&apos;s worth verifying. Our inspection journey includes: A structured, technology-backed inspection designed to identify performance risks in your home before they become repair costs.</p>
      </div>
      <div className="works-deck relative w-full max-w-[1050px]">
        {Array.from({length:index},(_,i)=><div key={i} aria-hidden className="absolute inset-0 rounded-2xl border border-brand bg-white" style={{transform:`translate(${(index-i)*7}px,-${(index-i)*7}px)`,zIndex:i}} />)}
        <article key={step.title} className="works-card relative z-10 grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-[1.1fr_1fr]" aria-live="polite">
          <div className="works-image relative"><Image src={step.image} alt={step.title} fill sizes="(min-width:768px) 560px, 90vw" quality={85} className="object-cover object-top" /></div>
          <div className="works-copy flex flex-col justify-start p-5 text-left md:justify-center md:p-9 md:text-center">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-deep">Step {String(index+1).padStart(2,'0')}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{step.title}</h3>
            {[step.intro,...(step.body||[]),step.outro].filter(Boolean).map(p=><p key={p} className="mt-3 text-sm leading-relaxed md:text-base">{p}</p>)}
            {step.points&&<ul className="mt-3 space-y-2 text-sm">{step.points.map(p=><li key={p}>{p}</li>)}</ul>}
          </div>
        </article>
      </div>
      <div className="flex shrink-0 gap-2" aria-label="Inspection steps">{steps.map((step,i)=><button type="button" key={step.title} onClick={()=>go(i)} aria-label={`View step ${i+1}: ${step.title}`} aria-current={i===index?'step':undefined} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"><span className={`h-1.5 rounded-full ${i===index?'w-8 bg-brand':'w-4 bg-brand/30'}`} /></button>)}</div>
    </div>
  </section>;
}
