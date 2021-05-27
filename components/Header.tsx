import Link from 'next/link';
import STATIC_ROUTES from '../constants/routes';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

const Header: React.FC<{ invert?: boolean }> = ({ invert = false }) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start flex-1 lg:w-0">
          <Link href="/">
            <a
              className={`whitespace-nowrap text-xl font-serif font-bold bg ${
                invert ? 'text-white' : 'text-gray-700'
              }`}
            >
              levelup<span className="text-yellah-400">.academy</span>
            </a>
          </Link>
        </div>

        <ButtonGroup className="flex items-center justify-end flex-1 lg:w-0">
          <Link href={STATIC_ROUTES.SignIn}>
            <a>
              <Button type="primary">Sign in</Button>
            </a>
          </Link>
          <Link href={STATIC_ROUTES.SignUp}>
            <a>
              <Button type={invert ? 'tertiary' : 'secondary'}>Sign up</Button>
            </a>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Header;
