import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bronscor",
  description:
    "Suppliers of Special Steels, Castings, 3D Printing Works and Tools & Hardware",
  assets: ["/images/logo.png"],
};

const page = () => {
  return <div>Dashboard</div>;
};
export default page;
