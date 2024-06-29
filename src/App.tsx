import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSpeedControl } from './hooks/useSpeedControl';
import { useInterval } from 'react-use';
import { quotes } from './data/quotes';
import { ChevronLeft, ChevronRight } from './components/icons';

function App() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const lastQuoteIndex = quotes.length - 1;
  const { speed } = useSpeedControl();
  const [isPaused, setIsPaused] = useState(false);

  const next = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote >= lastQuoteIndex ? 0 : currentQuote + 1,
    );
  };

  const previous = () => {
    setActiveQuoteIndex((currentQuote) =>
      currentQuote === 0 ? lastQuoteIndex : currentQuote - 1,
    );
  };

  useInterval(
    () => {
      window.requestAnimationFrame(next);
    },
    isPaused ? null : speed,
  );

  return (
    <main className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 py-16">
      <h1 className="text-4xl font-bold">Hello React & Tailwind!</h1>
      <div className="flex flex-row items-center gap-6">
        <motion.div
          animate={`quote_${activeQuoteIndex}`}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          className="relative w-[400px] max-w-full rounded-2xl bg-white px-12 py-5"
        >
          <div className="flex justify-center">
            {quotes.map((quote, index) => (
              <motion.img
                key={index}
                variants={{
                  [`quote_${index}`]: {
                    scale: 1.2,
                    zIndex: 10,
                  },
                }}
                // animate={{
                //   filter:
                //     isPaused && index !== activeQuoteIndex
                //       ? 'grayscale(1)'
                //       : 'grayscale(0)',
                //   scale: activeQuoteIndex === index ? 1.2 : isPaused ? 0.9 : 1,
                //   zIndex: activeQuoteIndex === index ? 10 : 0,
                // }}
                className="relative -mx-2 h-12 w-12 rounded-full border border-black"
                src={quote.image}
              />
            ))}
          </div>
          <div className="mt-3 grid text-center">
            {quotes.map((quote, index) => (
              <motion.blockquote
                key={index}
                // initial={{ y: 20, opacity: 0 }}
                // animate={{
                //   y: activeQuoteIndex === index ? 0 : 20,
                //   opacity: activeQuoteIndex === index ? 1 : 0,
                // }}
                className="relative [grid-area:1/1]"
              >
                <p>{quote.text}</p>
                <p className="mt-3 text-sm font-bold">
                  {quote.name} - {quote.roleCompany}
                </p>
              </motion.blockquote>
            ))}
          </div>
          <motion.button
            onClick={previous}
            // animate={{ x: isPaused ? 0 : -20, opacity: isPaused ? 1 : 0 }}
            className="absolute left-0 top-1/2 block px-3"
          >
            <ChevronLeft /> <span className="sr-only">Previous</span>
          </motion.button>
          <motion.button
            onClick={next}
            // animate={{ x: isPaused ? 0 : 20, opacity: isPaused ? 1 : 0 }}
            className="absolute right-0 top-1/2 block px-3"
          >
            <ChevronRight /> <span className="sr-only">Next</span>
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}

export default App;
