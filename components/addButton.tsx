interface AddButtonProps {
  type: string;
}
export const AddButton = (props: AddButtonProps) => {
  const addIncome = () => {
    console.log('add income');
  };
  const addAsset = () => {
    console.log('add asset');
  };
  const addExpense = () => {
    console.log('add expense');
  };

  let addHandler;
  switch (props.type) {
    case 'income':
      addHandler = addIncome;
      break;
    case 'asset':
      addHandler = addAsset;
      break;
    case 'expense':
      addHandler = addExpense;
      break;
  }
  return (
    <button
      className={`rounded-full w-16 h-16 flex flex-col justify-center items-center mr-2 border-2 border-dotted border-slate-400 text-2xl`}
      onClick={addHandler}
    >
      +
    </button>
  );
};
