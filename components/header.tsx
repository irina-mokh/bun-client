import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-gray">
      <div className="container mx-auto p-3">
        <nav className="flex items-center">
          <Link href="/">
            <div className="cursor-pointer flex items-center">
              <Image src="/logo.png" alt="logo" width="48" height="48"></Image>
              <span className="text-2xl text-almond font-semibold ml-2">Bun</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};
