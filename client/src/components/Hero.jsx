import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-8 top-8 h-36 w-36 animate-pulseSoft rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-8 h-56 w-56 animate-floatSlow rounded-full bg-sky-500/20 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="bg-gradient-to-r from-indigo-200 via-sky-100 to-indigo-100 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl">
          What&apos;s been hurting you lately?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Share your thoughts anonymously. Someone out there may understand exactly how you feel.
        </p>
        <a
          href="#share"
          className="mt-10 inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
        >
          Share Your Awaaz
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
