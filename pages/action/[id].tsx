import { useRouter } from 'next/router';
import { IActionProps } from '../../interfaces/action';

export default function Action({ action }: IActionProps) {
  const { query } = useRouter();
  return (
    <div>
      <h1>Action c id {query.id}</h1>
      <p>{action.id}</p>
      <p>{action.sum}</p>
      <p>{action.from}</p>
      <p>{action.to}</p>
      <p>{String(action.updatedAt)}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://bun-app.herokuapp.com/api/action/${params.id}`);
  const action = await response.json();
  return {
    props: { action }, // will be passed to the page component as props
  };
}
