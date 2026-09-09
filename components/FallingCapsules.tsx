"use client";
import { useEffect, useRef } from "react";
type Capsule={text:string;tone:"dark"|"outline"|"orange"};
type Body={x:number;y:number;w:number;h:number;vy:number;drag:boolean};
export default function FallingCapsules({title,bubbles}:{title:string;bubbles:Capsule[]}) {
  const panel=useRef<HTMLDivElement>(null),buttons=useRef<(HTMLButtonElement|null)[]>([]),bodies=useRef<Body[]>([]);
  const drag=useRef<{index:number;x:number;y:number}|null>(null);
  const reduced=useRef(false);
  useEffect(()=>{
    const el=panel.current;if(!el)return;
    reduced.current=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf=0,active=false,entered=false,last=0;
    function draw(){bodies.current.forEach((b,i)=>{if(buttons.current[i])buttons.current[i]!.style.transform=`translate(${Math.round(b.x)}px,${Math.round(b.y)}px)`;});}
    function layout(animate=false){if(!el)return;const rowHeight=Math.max(...buttons.current.map(b=>b?.offsetHeight||60))+12;el.style.height=`${rowHeight*Math.ceil(bubbles.length/2)+12}px`;bodies.current=bubbles.map((_,i)=>({x:12+(i%2)*(el.clientWidth/2-6),y:animate?-((Math.floor(i/2)+1)*rowHeight):12+Math.floor(i/2)*rowHeight,w:buttons.current[i]?.offsetWidth||100,h:buttons.current[i]?.offsetHeight||60,vy:0,drag:false}));draw();}
    function tick(now:number){const dt=Math.min(.025,(now-last)/1000||.016);last=now;if(!el)return;
      for(let pass=0;pass<3;pass++){
        for(const b of bodies.current){if(b.drag)continue;b.vy+=1400*dt/3;b.y+=b.vy*dt/3;const floor=el.clientHeight-b.h-12;if(b.y>floor){b.y=floor;b.vy=0;}}
        const list=bodies.current;
        for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){
          const a=list[i],b=list[j];if(a.x+a.w+8<=b.x||b.x+b.w+8<=a.x||a.y+a.h+8<=b.y||b.y+b.h+8<=a.y)continue;
          const upper=a.y+a.h/2<b.y+b.h/2?a:b,lower=upper===a?b:a;
          if(!upper.drag){upper.y=lower.y-upper.h-8;upper.vy=0;}else if(!lower.drag){lower.y=upper.y+upper.h+8;lower.vy=0;}
        }
      }draw();if(active)raf=requestAnimationFrame(tick);
    }
    layout();const io=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;cancelAnimationFrame(raf);if(active&&!reduced.current){if(!entered){layout(true);entered=true;}last=performance.now();raf=requestAnimationFrame(tick);}},{threshold:.2});io.observe(el);
    let width=el.clientWidth;const ro=new ResizeObserver(()=>{if(el.clientWidth!==width){width=el.clientWidth;layout();}});ro.observe(el);
    return()=>{active=false;cancelAnimationFrame(raf);io.disconnect();ro.disconnect();};
  },[bubbles]);
  function down(event:React.PointerEvent<HTMLButtonElement>,index:number){const b=bodies.current[index];if(!b)return;b.drag=true;b.vy=0;drag.current={index,x:event.clientX-b.x,y:event.clientY-b.y};event.currentTarget.setPointerCapture(event.pointerId);}
  function move(event:React.PointerEvent<HTMLButtonElement>){const d=drag.current,el=panel.current;if(!d||!el)return;const b=bodies.current[d.index];const x=Math.max(12,Math.min(el.clientWidth-b.w-12,event.clientX-d.x)),y=Math.max(0,Math.min(el.clientHeight-b.h-12,event.clientY-d.y));
    const blocked=bodies.current.some((other,i)=>i!==d.index&&x<other.x+other.w+8&&x+b.w+8>other.x&&y<other.y+other.h+8&&y+b.h+8>other.y);
    if(!blocked){b.x=x;b.y=y;event.currentTarget.style.transform=`translate(${Math.round(x)}px,${Math.round(y)}px)`;}
  }
  function up(event:React.PointerEvent<HTMLButtonElement>){const d=drag.current;if(d){const b=bodies.current[d.index];b.drag=false;b.vy=0;}drag.current=null;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);}
  return <article className="flex flex-col overflow-hidden rounded-2xl border border-ink/30 bg-cream"><h3 className="bg-ink px-4 py-4 text-center font-semibold text-white">{title}</h3><div ref={panel} className="relative h-[360px] flex-1 overflow-hidden">
    {bubbles.map((bubble,i)=><button key={bubble.text} ref={el=>{buttons.current[i]=el;}} type="button" onPointerDown={e=>down(e,i)} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label={`${bubble.text}. Drag into a free space and release to drop.`} className={`absolute left-0 top-0 flex min-h-16 w-[calc(50%-18px)] cursor-grab touch-none items-center justify-center rounded-[28px] border px-3 py-3 text-center text-xs font-semibold leading-relaxed active:cursor-grabbing sm:text-sm ${bubble.tone==='dark'?'border-ink bg-ink text-white':bubble.tone==='orange'?'border-brand bg-brand text-ink':'border-brand bg-white text-ink'}`}>{bubble.text}</button>)}
  </div></article>;
}
