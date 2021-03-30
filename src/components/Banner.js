import bannerLightMode from '../assets/images/banner-light-mode.jpg';
import bannerDarkMode from '../assets/images/banner-dark-mode.jpg';
const Banner = ({ isDarkMode }) => {
  return (
    <div>
      <img
        className="h-80 w-full"
        src={isDarkMode ? bannerDarkMode : bannerLightMode}
        alt=""
      />
    </div>
  );
};

export default Banner;
