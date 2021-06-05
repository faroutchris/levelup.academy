import Link from 'next/link';
import TextTransition, { presets } from 'react-text-transition';
import React from 'react';
import STATIC_ROUTES from '../constants/routes';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Header from './Header';

const TEXTS = ['E-learning', 'Exclusive content', 'Community resources', 'Tutorials'];
const TEXT_TIMEOUT = 5000;

const Hero: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), TEXT_TIMEOUT);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className="w-full bg-gray-900 relative flex flex-col overflow-hidden">
      <div className="container max-w-screen-2xl mx-auto bg-hero bg-no-repeat bg-top-left h-full px-4 md:px-6">
        <Header invert={true} />

        <div className="flex mt-24 space-x-4 mb-24">
          <div className="lg:w-2/4 md:w-3/4 w-full">
            <h2 className="lg:mt-12 md:text-5xl text-4xl font-bold text-white mb-8">
              <TextTransition
                text={TEXTS[index % TEXTS.length]}
                springConfig={presets.gentle}
                direction="down"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-400 to-cardinal-500">
                fit for your audience
              </span>
            </h2>
            <p className="text-white mb-16">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat eius et reiciendis,
              doloremque voluptas officiis, ex eligendi sapiente porro, cumque inventore
              necessitatibus quibusdam minus distinctio modi. Ex sapiente iste corrupti.
            </p>

            <ButtonGroup>
              <Link href={STATIC_ROUTES.Home}>
                <a>
                  <Button type="tertiary">Learn more</Button>
                </a>
              </Link>
              <Link href={STATIC_ROUTES.Signup}>
                <a>
                  <Button type="tertiary">Try it out</Button>
                </a>
              </Link>
            </ButtonGroup>
          </div>
          <div className="lg:w-2/4 w-full hidden lg:block">
            <img
              className="rounded-lg shadow-xl w-auto"
              style={{
                transform: 'perspective(1200px) rotateY(-11deg) rotateX(2deg) rotate(2deg)',
              }}
              src="/documentation.png"
            />
          </div>
        </div>

        <div className="flex space-x-16 justify-between mb-24">
          <div className="w-1/3 flex flex-row text-white">
            <img src="/analytics-icon.svg" className="w-16 h-16 mr-8" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum libero odio alias
            sunt corporis dicta itaque eaque provident!
          </div>
          <div className="w-1/3 flex flex-row text-white">
            <img src="/analytics-icon.svg" className="w-16 h-16 mr-8" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum libero odio alias
            sunt corporis dicta itaque eaque provident!
          </div>
          <div className="w-1/3 flex flex-row text-white">
            <img src="/analytics-icon.svg" className="w-16 h-16 mr-8" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum libero odio alias
            sunt corporis dicta itaque eaque provident!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
