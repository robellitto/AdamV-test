import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import { Leaf, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartProvider";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeProvider";

// const fuse = new Fuse(products, {
//   keys: ["name", "description"],
//   threshold: 0.3,
// });

function Header() {
  const { cart } = useCart();
  const { toggleTheme } = useTheme();
  const { isLoggedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [isSearchFocused, setIsSearchFocused] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState<Product[]>([]);
  // const searchPopupRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsScrolled(true);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      }
      if (currentScrollY === 0) {
        setIsScrolled(false);
        setIsScrollingUp(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       searchPopupRef.current &&
  //       !searchPopupRef.current.contains(event.target)
  //     ) {
  //       setIsSearchFocused(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   if (query.length > 0) {
  //     const results = fuse.search(query);
  //     setSearchResults(results.map((result) => result.item));
  //   } else {
  //     setSearchResults([]);
  //   }
  // };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? isScrollingUp
              ? "translate-y-0"
              : "-translate-y-full"
            : ""
        }`}
      >
        <div
          className={`container mx-auto px-4 transition-all duration-300 ${
            isScrolled
              ? "py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-full mt-4 max-w-3xl"
              : "py-4 bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="font-bold whitespace-nowrap text-lg">
                Adam's VP
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <Link
                to="/products"
                className="transition-colors hover:text-green-600"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="transition-colors hover:text-green-600"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="transition-colors hover:text-green-600"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <Input
                  placeholder="Search products..."
                  className="w-[150px] md:w-[200px] pr-8 bg-white/50 dark:bg-gray-800/50 border-none shadow-inner backdrop-blur-sm"
                  onFocus={() => setIsSearchFocused(true)}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div> */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                onClick={toggleTheme}
                className="bg-white/50 dark:bg-gray-800/50 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
              >
                <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {isLoggedIn && (
                <Link
                  className="bg-white/50 dark:bg-gray-800/50 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
                  to="cart"
                >
                  <span className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-1.5 -right-2 text-sm font-bold bg-black text-white rounded-full h-4 w-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  </span>
                </Link>
              )}
              {!isLoggedIn && (
                <>
                  <Link to="/login">
                    <Button className="bg-green-600/90 hover:bg-green-700/90 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button className="bg-green-600/90 hover:bg-green-700/90 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden bg-white/50 dark:bg-gray-800/50 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
                  >
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[180px] sm:w-[280px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link to="/products" className="text-lg font-medium">
                      Products
                    </Link>
                    <Link to="/about" className="text-lg font-medium">
                      About
                    </Link>
                    <Link to="/contact" className="text-lg font-medium">
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      {/* {isSearchFocused && (
        <div className="fixed inset-0 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div
            ref={searchPopupRef}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg shadow-xl w-full max-w-3xl backdrop-blur-md max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Search products..."
                className="w-full text-lg bg-white/50 dark:bg-gray-700/50 border-none shadow-inner mr-4 backdrop-blur-sm"
                autoFocus
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchFocused(false)}
                className="bg-white/50 dark:bg-gray-700/50 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm flex-shrink-0"
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Search Results</h3>
              <div className="space-y-4">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
                    >
                      <CardContent className="p-4 flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.description}
                          </p>
                          <p className="text-sm font-bold text-green-600">
                            {product.price}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        No results found. Try adjusting your search.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Header;
