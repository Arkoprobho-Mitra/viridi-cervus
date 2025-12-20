import React from 'react';
import SlidingWindow from './Header.Slideshow';
import img1 from './Item.sponsored/pexels-estoymhrb-12966968.jpg';
import img2 from './Item.sponsored/pexels-karola-g-5625049.jpg';
import img3 from './Item.sponsored/pexels-kish-1488463.jpg';
import img4 from './Item.sponsored/pexels-mart-production-7679722.jpg';
import img5 from './Item.sponsored/pexels-okiki-onipede-1803710719-32759872.jpg';
import img6 from './Item.sponsored/pexels-olly-3755706.jpg';
import img7 from './Item.sponsored/pexels-willoworld-3768005.jpg';

const ItemSponsored = () => {
    const items = [
        <img src={img1} alt="slide 1" draggable="false" />,
        <img src={img2} alt="slide 2" draggable="false" />,
        <img src={img3} alt="slide 3" draggable="false" />,
        <img src={img4} alt="slide 4" draggable="false" />,
        <img src={img5} alt="slide 5" draggable="false" />,
        <img src={img6} alt="slide 6" draggable="false" />,
        <img src={img7} alt="slide 7" draggable="false" />
    ];

    return <SlidingWindow items={items} windowSize={1} />;
};

export default ItemSponsored;
