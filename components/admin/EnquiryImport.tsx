"use client";
import { useState } from "react";
import type { StoredEnquiryRecord } from "@/lib/admin/types";
export default function EnquiryImport({onImported}:{onImported:(items:StoredEnquiryRecord[])=>void}) {
  const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
  async function importData() {
    if(!confirm('Import historical Supabase enquiries into the currently configured admin storage? Existing records will be retained. This does not send emails.'))return;
    setBusy(true);setMessage('');
    try {
      let offset=0,imported=0,skipped=0,hasMore=true;
      while(hasMore){
        const response=await fetch('/api/admin/import-enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({offset})});
        const result=await response.json();if(!response.ok)throw Error(result.error||'Import failed.');
        imported+=result.imported;skipped+=result.skipped;offset=result.nextOffset;hasMore=result.hasMore;
        setMessage(`${hasMore?'Importing':'Complete'}: ${imported} imported; ${skipped} already existed.`);onImported(result.enquiries);
      }
    }catch(error){setMessage(error instanceof Error?error.message:'Import failed.');}finally{setBusy(false);}
  }
  return <div className="mb-6 rounded-2xl border border-line bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-semibold">Historical enquiries</h2><p className="mt-1 text-sm">One-time Supabase import. Uses server-only legacy credentials; it never deletes the source or sends emails.</p></div><button type="button" disabled={busy} className="min-h-11 rounded-xl border border-brand px-4 font-semibold disabled:opacity-50" onClick={()=>void importData()}>{busy?'Importing...':'Import from Supabase'}</button></div>{message&&<p role="status" className="mt-3 text-sm">{message}</p>}</div>;
}
