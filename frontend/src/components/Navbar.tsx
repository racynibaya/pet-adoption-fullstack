import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link to='/'>Section 1</Link>
        <Link to='/'>Section 2</Link>
        <Link to='/'>Section 3</Link>
      </ul>
    </nav>
  );
};
export default Navbar;
