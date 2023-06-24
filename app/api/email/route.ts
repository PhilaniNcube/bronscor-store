
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export async function POST(request: Request) {
 const {first_name, last_name, email, status} = await request.json();

  const mail = await resend.emails.send({
  from: 'onlinestore@bronscorcc.co.za',
  to: email,
  subject: 'Thank you for your order',
  html: `<p style="margin: 10px auto; width: 300px;">Thank you ${first_name} ${last_name} for your order. Orders usually take 4 to 6 days to be delivered.</p>`
});
  console.log(mail.id)
  return NextResponse.json({message: "Email Sent"})

}
