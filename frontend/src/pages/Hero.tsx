import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Navbar from '../components/Navbar';

import logo from '@/assets/logo.png';
import heroImage from '@/assets/hero.jpg';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <>
      <div className='md:hidden px-2'>
        <div className='flex justify-between'>
          <Link to='/'>
            <img
              src={logo}
              alt='Cat and dog cartoonish image'
              className='flex h-12'
            />
          </Link>
          <MobileNav />
        </div>

        <div className='flex flex-col gap-6 text-center'>
          <h1 className='text-6xl font-bold text-slate-600  pt-16'>
            FurEver Finds
          </h1>

          <p className='leading-6 text-gray-500'>
            Discover loyal companions waiting to bring joy into your life.
            Adopt, don't shop, and make a difference in a pet's life. Begin your
            heartwarming journey now!
          </p>

          <img
            src={heroImage}
            alt='Image of a brown dog'
            className='rounded-lg mb-5'
          />
        </div>

        <div className='flex gap-2'>
          <Button
            variant='outline'
            className='bg-orange-500 text-white flex-1 w-48 hover:bg-orange-600 hover:text-white'
          >
            Find your furry friend!
          </Button>
          <Button variant='outline' className='flex-initial w-36'>
            Learn more
          </Button>
        </div>
      </div>

      <div className='hidden md:block'>
        <Navbar />
      </div>
    </>
  );
};

export default Hero;
