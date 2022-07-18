import { useRouter } from 'next/router';

export default function Category({ cat }) {
  const { query } = useRouter();
  return (
    <div>
      <h1>Category c id {query.id}</h1>
      <p>{cat.name}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://bun-app.herokuapp.com/api/category/${params.id}`);
  console.log(response);
  const cat = await response.json();
  return {
    props: { cat },
  };
}
