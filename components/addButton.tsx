import Link from 'next/link';

interface AddButtonProps {
  type: string;
}
export const AddButton = (props: AddButtonProps) => {
  return (
    <Link href={{ pathname: '/add-category', query: { catType: props.type } }}>
      <button
        className={`rounded-full w-16 h-16 flex flex-col justify-center items-center mr-2 border-2 border-dotted border-slate-400 text-2xl`}
      >
        +
      </button>
    </Link>
  );
};
