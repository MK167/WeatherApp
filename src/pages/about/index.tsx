import { useNavigate } from 'react-router';
import { NavbarRoutes } from '../../constant/route.define';

const About = () => {

  const navigate = useNavigate();
  const goToContact = () => {
    // Navigate to the current path to trigger a refresh
    navigate(NavbarRoutes.find(route => route.id === "contact")?.path || "/contact", { replace: true });
  };
  return (
    <div>
      <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer' onClick={goToContact}>
        contact page
      </button>
    </div>
  );
}

export default About
