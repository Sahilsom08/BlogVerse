import { Container, Logo, LogoutBtn } from "..";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpnen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 block z-10 bg-[#19191c]  border-b border-gray-700">
      <Container>
        <nav className="flex">
          <div className=" flex items-center">
            <Link to="/">
              <Logo/>
            </Link>
          </div>

          <div
            className={`${
              isOpen ? "hidden" : "block"
            } md:hidden block mr-4 text-3xl absolute right-0 text-white hover:text-purple-700 `}
          >
            <button onClick={() => setIsOpnen((prev) => !prev)}>
              <IoMenu />
            </button>
          </div>

          <ul
            className={` ${
              isOpen && window.innerWidth <= 786
                ? "flex z-20 flex-col items-center px-1 py-8 m-2  absolute top-0 w-[150px] right-0 bg-gray-500 bg-opacity-50  rounded-lg"
                : " hidden md:flex flex-row ml-auto space-x-2"
            } `}
          >
            <div
              className={`${
                isOpen ? "block  " : "hidden"
              }   mr-2  text-3xl absolute top-[6px] right-0 text-white hover:text-purple-700 `}
            >
              <button onClick={() => setIsOpnen((prev) => !prev)}>
                <IoClose />
              </button>
            </div>

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={`${
                      item.name === "Signup" ? "secondaryBtn" : "btn"
                    }`}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
