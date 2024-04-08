export default function FighterPage({ params }: { params: { name: string } }) {
  return <p>Post: {params.name}</p>;
}
