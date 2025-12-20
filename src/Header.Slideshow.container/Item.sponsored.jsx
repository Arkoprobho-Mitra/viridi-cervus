import React from 'react';
import SlidingWindow from './Header.Slideshow';
import img1 from './Item.sponsored/alexander-naglestad-RFhq0SrrgEg-unsplash.jpg';
import img2 from './Item.sponsored/jack-gardner-arjiIKicU-0-unsplash.jpg';
import img3 from './Item.sponsored/khuc-le-thanh-danh-zhtg7q1Uj1g-unsplash.jpg';
import img4 from './Item.sponsored/nguyen-dang-hoang-nhu-Nne2TxFHPyQ-unsplash.jpg';
import img5 from './Item.sponsored/salah-darwish-iC_emD6i3fM-unsplash.jpg';
import img6 from './Item.sponsored/shivansh-sharma-l2cFxUEEY7I-unsplash.jpg';

const ItemSponsored = () => {
    const items = [
        <img src={img1} alt="slide 1" draggable="false" />,
        <img src={img2} alt="slide 2" draggable="false" />,
        <img src={img3} alt="slide 3" draggable="false" />,
        <img src={img4} alt="slide 4" draggable="false" />,
        <img src={img5} alt="slide 5" draggable="false" />,
        <img src={img6} alt="slide 6" draggable="false" />
    ];

    return <SlidingWindow items={items} windowSize={1} />;
};

export default ItemSponsored;
