import { NavLink } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineRateReview } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const navLinks = [
    { to: "/dashboard/adminprofile", icon: <CgProfile size={17} />, label: "Profile" },
    { to: "/dashboard/allproperties", icon: <CiViewList size={17} />, label: "Manage Properties" },
    { to: "/dashboard/manageusers", icon: <FaUsersCog size={17} />, label: "Manage Users" },
    { to: "/dashboard/managereviews", icon: <MdOutlineRateReview size={17} />, label: "Manage Reviews" },
    { to: "/dashboard/alltransiction", icon: <GrTransaction size={17} />, label: "Transaction History" },
];

const AdminNav = () => {
    return (
        <ul className="space-y-1 w-full">
            {navLinks.map(({ to, icon, label }) => (
                <li key={to}>
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                            ${isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={isActive ? "text-blue-600" : "text-gray-400"}>
                                    {icon}
                                </span>
                                {label}
                            </>
                        )}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default AdminNav;