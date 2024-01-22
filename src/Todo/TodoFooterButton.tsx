type TodoFooterButtonProps = {
  isActive: boolean;
  text: string;
  testId: string;
  onClickHandler: () => void;
  className?: string;
};

export default function TodoFooterButton({
  isActive,
  text,
  testId,
  onClickHandler,
  className = '',
}: TodoFooterButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      data-testid={testId}
      className={className}
    >
      <span className={`${isActive ? 'text-blue-600' : ''}`}>{text}</span>
    </button>
  );
}
