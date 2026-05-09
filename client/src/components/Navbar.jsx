const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080d1a]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-xl font-semibold tracking-wide text-indigo-200">Awaaz</span>
        <a
          href="#share"
          className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02] hover:shadow-lg"
        >
          Share Your Awaaz
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
