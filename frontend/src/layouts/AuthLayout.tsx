type Props = {
  children: React.ReactNode;
};
const SignUpLayout = ({ children }: Props) => {
  return (
    <>
      <div className='container min-h-screen flex flex-col justify-center items-center'>
        {children}
      </div>
    </>
  );
};
export default SignUpLayout;
