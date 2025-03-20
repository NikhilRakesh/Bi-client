import Home from "../page";

export default async function City({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  console.log(city);
  
  return <Home city={city}/>;
}
