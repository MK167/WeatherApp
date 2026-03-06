import { NavLink } from "react-router";
import { NavbarRoutes } from "../constant/route.define";

function Navbar() {
  return (
    <nav className="bg-gray-400 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <ul className="flex space-x-4">
          {NavbarRoutes.map((item) => (
            <li key={item.id}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
