import { useContext, useRef } from "react";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const navItems = [
    {
        name: "Home",
        to: "/",
    },
    {
        name: "Colleges",
        to: "/colleges",
    },
    {
        name: "Admission",
        to: "/admission",
    },
    {
        name: "My College",
        to: "/mycollege",
        type: "private",
    },
];


const NavigationBar = () => {

    const drawerRef = useRef();
    const { user, LogOutUser } = useContext(AuthContext);
    console.log(user)

    // const theme = 'white'; // TODO

    const handleLogout = () => {
        LogOutUser()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User log out successfully.',
                    showConfirmButton: true,
                    // timer: 1500
                });
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            })
    };

    return (

        <nav className="fixed top-0 left-0 w-full z-50 shadow-sm">
            <div className="drawer z-20">
                <input
                    ref={drawerRef}
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full bg-base-300">
                        <div className="container navbar justify-between items-center">
                            <Link to="/" className="shrink-0">
                                <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
                                    <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                                        C
                                    </div>
                                </div>
                                <h2
                                    // className={`ml-2 text-[22px] sm:text-2xl font-bold hidden min-[375px]:block ${theme === "dark" ? "text-white" : "gradient-text"
                                    //     }`}
                                    className="ml-2 text-[22px] sm:text-2xl font-bold hidden min-[375px]:block gradient-text"
                                >
                                    CollegeGenius
                                </h2>
                            </Link>
                            <div className="flex-1 hidden lg:block text-center">
                                <ul className="flex space-x-10 justify-center">
                                    {/* Navbar menu content here */}
                                    {navItems.map((item, id) => {
                                        if (item.type !== "private") {
                                            return (
                                                <li key={id}>
                                                    <NavLink
                                                        to={item.to}
                                                        className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                </li>
                                            );
                                        } else {
                                            if (user) {
                                                return (
                                                    <li key={id}>
                                                        <NavLink
                                                            to={item.to}
                                                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                );
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">




                                {user ? (
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-ghost btn-circle avatar mt-0.5"
                                        >
                                            <div className="w-10 rounded-full">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <Link to="/profile">
                                                    <a className="hover:!bg-neutral/10">
                                                        {user?.displayName}
                                                    </a>
                                                </Link>
                                            </li>
                                            <li onClick={handleLogout}>
                                                <a className="hover:!bg-neutral/10">Sign Out</a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            to="/signin"
                                            className="hidden sm:inline-flex btn btn-gradient rounded-full min-h-fit h-10"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signin"
                                            className="btn sm:hidden btn-ghost text-2xl min-h-fit h-10 text-secondary"
                                        >
                                            <BiLogIn />
                                        </Link>
                                    </>
                                )}
                                {/* <ThemeToggler /> */}
                                <div className="flex-none lg:hidden">
                                    <label
                                        htmlFor="my-drawer-3"
                                        className="btn btn-square btn-ghost"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block w-6 h-6 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            ></path>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="p-4 w-80 h-full bg-base-200 text-base relative flex-nowrap">
                        <label
                            htmlFor="my-drawer-3"
                            className="btn btn-ghost absolute top-2 right-2 text-2xl text-secondary"
                        >
                            <MdOutlineClose />
                        </label>
                        <div to="/" className="flex items-center mb-8">
                            <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
                                <div className="w-8 h-8 rounded-full bg-base-300 text-center font-bold text-2xl text-neutral">
                                    C
                                </div>
                            </div>
                            <h2
                                // className={`ml-2 text-[22px] sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "gradient-text"
                                //     }`}
                                className="ml-2 text-[22px] sm:text-2xl font-bold gradient-text"
                            >
                                CollegeGenius
                            </h2>
                        </div>
                        <ul className="space-y-3 ml-4 ">

                            {navItems.map((item, id) => {
                                if (item.type !== "private") {
                                    return (
                                        <li
                                            onClick={() => (drawerRef.current.checked = false)}
                                            key={id}
                                        >
                                            <NavLink
                                                to={item.to}
                                                className={({ isActive }) => (isActive ? 'active' : 'default')}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>

                                    );
                                } else {
                                    if (user) {
                                        return (
                                            <li key={id}>
                                                <NavLink
                                                    to={item.to}
                                                    className={({ isActive }) => (isActive ? 'active' : 'default')}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        );
                                    }
                                }

                            })}
                        </ul>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default NavigationBar;