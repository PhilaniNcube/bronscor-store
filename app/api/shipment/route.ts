import { NextResponse } from "next/server";

export async function POST(request: Request) {
 const {type, company, street_address, local_area, city, zone, country, code, first_name, last_name, email, phone, parcels, orderValue} = await request.json();

 console.log({type, company, street_address, local_area, city, zone, country, code, first_name, last_name, email, phone, parcels, orderValue})

 // biome-ignore lint/suspicious/noExplicitAny: <explanation>
 const newParcels = parcels[0].map((parcel:any) => {
  return {
           submitted_length_cm: parcel.length/10,
          submitted_width_cm: parcel.width/10,
          submitted_height_cm: parcel.height/10,
          submitted_weight_kg: parcel.weight,
  }
 })

 console.log({ parcels, newParcels })



 const req = await fetch("https://api.shiplogic.com/v2/shipments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SHIPLOGIC_API_KEY}`,
  },
  body: JSON.stringify({
    collection_address: {
      type: "business",
      company: "Bronscor",
      street_address: "51 Mangold Street",
      local_area: "Newton Park",
      city: "Port Elizabeth",
      zone: "Eastern Cape",
      country: "ZA",
      // lat: -33.94445849668724,
      // lng: 25.564898894423482
    },
    collection_contact: {
      name: "Bronscor Reception",
      mobile_number: "",
      email: "vimaal@bronscorcc.co.za",
    },
    delivery_address: {
      type,
      company,
      street_address,
      local_area,
      city,
      zone,
      country,
      code,
      // lat: -25.76423,
      // lng: 28.280179
    },
    delivery_contact: {
      name: `${first_name} ${last_name}`,
      mobile_number: phone,
      email:email,
    },
    parcels: newParcels,
    opt_in_rates: [],
    opt_in_time_based_rates: [],
    special_instructions_collection: "This is a test shipment - DO NOT COLLECT",
    special_instructions_delivery: "This is a test shipment - DO NOT DELIVER",
    declared_value: orderValue,
      // "collection_min_date": "2023-07-10T00:00:00.000Z",
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    "collection_after": "08:00",
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    "collection_before": "16:00",
    // "delivery_min_date": "2023-07-21T00:00:00.000Z",
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    "delivery_after": "10:00",
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    "delivery_before": "17:00",
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    "custom_tracking_reference": "",
    // "customer_reference": "ORDERNO123",
    service_level_code: "ECO",
    mute_notifications: false,

  }),
 })

 const result = await req.json()

 console.log(result)

 return NextResponse.json({data: result})

}
