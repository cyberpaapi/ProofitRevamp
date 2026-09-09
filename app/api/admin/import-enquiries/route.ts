import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { appendEnquiry, getEnquiries } from "@/lib/admin/store";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  if(!await isAdminAuthenticated())return NextResponse.json({error:'Unauthorized'},{status:401});
  const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return NextResponse.json({error:'Set SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) on this environment to import the old enquiries. No records were changed.'},{status:400});
  let imported=0,skipped=0;
  try {
    const input = await request.json().catch(() => ({}));
    const offset = Number(input.offset || 0);
    if (!Number.isSafeInteger(offset) || offset < 0) return NextResponse.json({error:"Invalid import offset."},{status:400});
    const origin=new URL(url);if(origin.protocol!=='https:'||!origin.hostname.endsWith('.supabase.co'))throw Error('Unsupported Supabase project URL.');
    const existing=new Set((await getEnquiries()).map(item=>item.id));
    const headers:Record<string,string>={apikey:key};
    // Modern sb_secret keys are not JWT bearer tokens.
    if(key.startsWith('eyJ'))headers.Authorization=`Bearer ${key}`;
      const response=await fetch(`${origin.origin}/rest/v1/enquiries?select=*&order=id.asc&limit=100&offset=${offset}`,{headers,cache:'no-store',signal:AbortSignal.timeout(15000)});
      if(!response.ok)throw Error(`Supabase returned ${response.status}. Check the project, server key and enquiries table permissions.`);
      const rows=await response.json();if(!Array.isArray(rows))throw Error('Unexpected enquiry response.');
      for(const row of rows){
        const id=String(row.id||`supabase-${createHash('sha256').update(JSON.stringify(row)).digest('hex').slice(0,24)}`);
        if(existing.has(id)){skipped++;continue;}
        const date=new Date(row.created_at||row.received_at||row.receivedAt||Date.now());
        await appendEnquiry({id,receivedAt:Number.isNaN(date.getTime())?new Date().toISOString():date.toISOString(),name:String(row.name||row.full_name||''),email:String(row.email||''),phone:String(row.phone||''),service:String(row.service||''),property:String(row.property||row.property_type||''),message:String(row.message||''),source:String(row.source||'Historical website enquiry (Supabase; original page unavailable)')});
        existing.add(id);imported++;
      }
    return NextResponse.json({imported,skipped,hasMore:rows.length===100,nextOffset:offset+rows.length,enquiries:await getEnquiries()});
  }catch(error){return NextResponse.json({error:`${error instanceof Error?error.message:'Import failed.'} ${imported} records imported before stopping. You can retry safely.`},{status:502});}
}
