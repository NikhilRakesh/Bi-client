import Home from "../page";

export default async function City({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  
  return <Home city={city}/>;
}
