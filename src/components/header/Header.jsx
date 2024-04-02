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
    <header className="py-3  block z-10 bg-[#19191c]  border-b border-gray-700">
      <Container>
        <nav className="flex">
          <div className="">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div
            className={`md:hidden z-10  mr-4 text-3xl absolute right-0 text-white hover:text-purple-700 `}
          >
            <button onClick={() => setIsOpnen((prev) => !prev)}>
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          <ul
            className={`ml-auto md:static md:bg-transparent md:p-0 md:rounded-none  md:w-auto md:items-center md:flex-row  md:flex
          ${isOpen ? "absolute right-4 flex flex-col bg-gray-400 bg-opacity-55 p-2 rounded-lg " : "hidden"}
          `}
          >
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
