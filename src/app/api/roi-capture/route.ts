import { NextRequest, NextResponse } from "next/server";

interface RoiCapturePayload {
  email: string;
  leads: number;
  commission: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: RoiCapturePayload = await request.json();
    const { email, leads, commission } = body;

    if (!email || !leads || !commission) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send to Web3Forms (same service as contact form)
    const WEB3FORMS_ACCESS_KEY = "00038c9b-dba4-4daa-8dc7-8d0a7aaec3ce";
    const INDUSTRY_CLOSE_RATE = 0.08;
    const AI_IMPROVEMENT = 0.34;
    const monthlyLost = Math.round(leads * INDUSTRY_CLOSE_RATE * AI_IMPROVEMENT * commission);
    const annualLost = monthlyLost * 12;

    const web3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        email,
        leads_per_month: leads,
        avg_commission: commission,
        monthly_revenue_lost: monthlyLost,
        annual_revenue_lost: annualLost,
        subject: `ROI Calculator — New Lead Capture (${leads} leads/mo × $${commission.toLocaleString()})`,
        from_name: "ROI Calculator",
        message: `${email} used the ROI Calculator. Leads/mo: ${leads}, Avg commission: $${commission.toLocaleString()}, Monthly lost: $${monthlyLost.toLocaleString()}, Annual lost: $${annualLost.toLocaleString()}.`,
      }),
    });

    const web3Data = await web3Res.json();

    if (!web3Data.success) {
      console.error("ROI capture Web3Forms error:", web3Data);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    // TODO: Trigger email sequence (Email 1: immediate recap — send within 60s)
    // TODO: Schedule Email 2 (case study) for day 2
    // TODO: Schedule Email 3 (soft CTA) for day 4-5
    console.log("[ROI CAPTURE]", {
      email,
      leads,
      commission,
      monthlyLost,
      annualLost,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ROI capture error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
