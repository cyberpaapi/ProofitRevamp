"use client";
import { useState } from "react";
import type { AdminContact, AdminOffering, AdminTeamMember } from "@/lib/admin/types";
const input="mt-2 min-h-11 w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-base focus:outline-brand";
function Field({label,children}:{label:string;children:React.ReactNode}) {return <label className="block text-sm font-semibold">{label}{children}</label>;}
function Editor<T extends {id:string;visible:boolean;order:number}>({items,onChange,create,label,render,title}:{items:T[];onChange:(items:T[])=>void;create:()=>T;label:(item:T)=>string;render:(item:T,patch:(data:Partial<T>)=>void)=>React.ReactNode;title:string}) {
  const [selected,setSelected]=useState(items[0]?.id||'');
  const current=items.find(item=>item.id===selected);
  const patch=(data:Partial<T>)=>onChange(items.map(item=>item.id===selected?{...item,...data}:item));
  return <div><div className="mb-6 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm">Edits publish after you click Save changes. New items start hidden.</p></div><button className="min-h-11 rounded-xl bg-ink px-4 text-white" onClick={()=>{const item=create();onChange([...items,item]);setSelected(item.id);}}>Add new</button></div>
    <div className="grid gap-5 lg:grid-cols-[300px_1fr]"><div className="space-y-2">{items.map(item=><button key={item.id} className={`min-h-16 w-full rounded-xl border p-4 text-left ${selected===item.id?'border-brand bg-brand-soft':'border-line bg-white'}`} onClick={()=>setSelected(item.id)}>{label(item)}<span className="mt-1 block text-xs">{item.visible?'Live':'Hidden'}</span></button>)}</div>
      <div className="space-y-5 rounded-2xl border border-line bg-white p-6">{current?<>{render(current,patch)}<Field label="Display order"><input type="number" className={input} value={current.order} onChange={e=>patch({order:Number(e.target.value)} as Partial<T>)} /></Field><label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={current.visible} onChange={e=>patch({visible:e.target.checked} as Partial<T>)} />Visible on website</label><button className="min-h-11 rounded-xl border border-red-200 px-4 text-red-700" onClick={()=>{if(confirm(`Delete ${label(current)}?`)){onChange(items.filter(item=>item.id!==current.id));setSelected('');}}}>Delete item</button></>:<p>Select an item or add a new one.</p>}</div>
    </div></div>;
}
export function TeamPanel({items,onChange}:{items:AdminTeamMember[];onChange:(items:AdminTeamMember[])=>void}) {
  return <Editor title="Founders & leadership" items={items} onChange={onChange} label={item=>item.name} create={()=>({id:crypto.randomUUID(),name:'New team member',role:'',bio:'',image:'/images/team/hardik-back.webp',visible:false,order:items.length})} render={(item,patch)=><>
    {(['name','role','image'] as const).map(key=><Field key={key} label={key==='role'?'Designation':key==='image'?'Image path or public media URL':'Name'}><input className={input} value={item[key]} onChange={e=>patch({[key]:e.target.value})} /></Field>)}
    <Field label="Biography"><textarea rows={9} className={input} value={item.bio} onChange={e=>patch({bio:e.target.value})} /></Field>
    <p className="text-sm text-ink/60">Use Images to upload a replacement, then paste its path here.</p>
  </>} />;
}
export function OfferingsPanel({items,onChange}:{items:AdminOffering[];onChange:(items:AdminOffering[])=>void}) {
  return <Editor<AdminOffering> title="Services & homepage cards" items={items} onChange={onChange} label={item=>item.title} create={()=>({id:crypto.randomUUID(),category:'home-inspection',slug:`service-${crypto.randomUUID().slice(0,8)}`,title:'New service',description:'',image:'/images/svc-possession-tablet.webp',benefits:[],homepage:false,visible:false,order:items.length})} render={(item,patch)=><>
    <Field label="Service category"><select className={input} value={item.category} onChange={e=>patch({category:e.target.value as AdminOffering['category']})}><option value="home-inspection">Home Inspection</option><option value="water-inspection">Water Inspection</option><option value="care-plus">Proofit Care+</option></select></Field>
    <Field label="Service title"><input className={input} value={item.title} onChange={e=>patch({title:e.target.value})}/></Field>
    <Field label="Section anchor (lowercase letters, numbers and hyphens)"><input className={input} pattern="[a-z0-9-]+" value={item.slug} onChange={e=>patch({slug:e.target.value})}/></Field>
    <Field label="Description"><textarea className={input} rows={7} value={item.description} onChange={e=>patch({description:e.target.value})}/></Field>
    <Field label="Homepage image path or public media URL"><input className={input} value={item.image} onChange={e=>patch({image:e.target.value})}/></Field>
    <Field label="Benefits (one per line)"><textarea className={input} rows={5} value={item.benefits.join('\n')} onChange={e=>patch({benefits:e.target.value.split('\n')})}/></Field>
    <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={item.homepage} onChange={e=>patch({homepage:e.target.checked})}/>Feature on homepage and landing page 2</label>
    <p className="break-all rounded-lg bg-brand-soft p-3 text-sm">Learn More links to {item.category==='care-plus'?'/care-plus':`/services/${item.category}`}#{item.slug}</p>
  </>} />;
}
export function ContactSettingsPanel({value,onChange}:{value:AdminContact;onChange:(value:AdminContact)=>void}) {
  return <div className="max-w-3xl space-y-5 rounded-2xl border border-line bg-white p-6"><h2 className="text-2xl font-semibold">Contact details</h2><p>Save changes to update the website. Campaign pages show only the first number. WhatsApp remains on the approved +91 98337 79955 number.</p><Field label="Phone numbers with country code (one per line)"><textarea rows={5} className={input} value={value.phones.join('\n')} onChange={e=>onChange({...value,phones:e.target.value.split('\n')})}/></Field><Field label="Contact email"><input type="email" className={input} value={value.email} onChange={e=>onChange({...value,email:e.target.value})}/></Field></div>;
}
