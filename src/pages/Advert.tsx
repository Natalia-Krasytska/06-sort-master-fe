import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AdvertCard from '../components/AdvertCard';
import {useAdvertContext} from "../Context/AdvertContext.tsx";

const Advert = () => {
    const { adverts } = useAdvertContext();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="advert-carousel">
            <h1 className="text-2xl font-bold mb-4">Adverts</h1>
            <Slider {...settings}>
                {adverts.map((advert) => (
                    <div key={advert.id}>
                        <AdvertCard advert={advert} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Advert;
