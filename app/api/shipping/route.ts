import { NextResponse } from "next/server";

export async function POST(request: Request) {
 const {type, company, street_address, local_area, city, zone, country, code, parcels} = await request.json();

 const newParcels = parcels[0].map((parcel:any) => {
  return {
          submitted_length_cm: parcel.depth,
          submitted_width_cm: parcel.width,
          submitted_height_cm: parcel.height,
          submitted_weight_kg: parcel.weight,
  }
 })

 const req = await fetch(`https://api.shiplogic.com/v2/rates`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SHIPLOGIC_API_KEY}`,
  },
  body: JSON.stringify({
    collection_address: {
      type: "business",
      company: "Bronscor",
      street_address: "51 Mangold St",
      local_area: "Newton Park",
      city: "Port Elizabeth",
      zone: "Eastern Cape",
      country: "ZA",
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
    },
    parcels: newParcels,
  }),
 }).then((res) => res.json()).catch((err) => {
  console.log(err)
  return  {
      error: err,
      details: "There was an error with the shipping rates request"
    }
})

 const result = await req

 console.log(result)

 return NextResponse.json({data: result})

}
