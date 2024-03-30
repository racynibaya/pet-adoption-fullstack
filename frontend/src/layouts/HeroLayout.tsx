type Props = {
  children: React.ReactNode;
};

const HeroLayout = ({ children }: Props) => {
  return <div className='container p-2 min-h-screen'>{children}</div>;
};
export default HeroLayout;
