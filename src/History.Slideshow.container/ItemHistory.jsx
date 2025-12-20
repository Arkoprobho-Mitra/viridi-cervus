import React from 'react';
import HistorySlidingWindow from './History.Slideshow.jsx';
import img1 from './item.history.container/pexels-estoymhrb-12966968.jpg';
import img2 from './item.history.container/pexels-karola-g-5625049.jpg';
import img3 from './item.history.container/pexels-kish-1488463.jpg';
import img4 from './item.history.container/pexels-mart-production-7679722.jpg';
import img5 from './item.history.container/pexels-okiki-onipede-1803710719-32759872.jpg';
import img6 from './item.history.container/pexels-olly-3755706.jpg';
import img7 from './item.history.container/pexels-willoworld-3768005.jpg';

import HistoryBanner from './History.Banner.jsx';

const ItemHistory = () => {
    const items = [
        {
            image: <img src={img1} alt="slide 1" draggable="false" />,
            description: "item 1 description"
        },
        {
            image: <img src={img2} alt="slide 2" draggable="false" />,
            description: "item 2 description"
        },
        {
            image: <img src={img3} alt="slide 3" draggable="false" />,
            description: "item 3 description"
        },
        {
            image: <img src={img4} alt="slide 4" draggable="false" />,
            description: "item 4 description"
        },
        {
            image: <img src={img5} alt="slide 5" draggable="false" />,
            description: "item 5 description"
        },
        {
            image: <img src={img6} alt="slide 6" draggable="false" />,
            description: "item 6 description"
        },
        {
            image: <img src={img7} alt="slide 7" draggable="false" />,
            description: "item 7 description"
        }
    ];

    return (
        <div>
            <HistoryBanner />
            <HistorySlidingWindow items={items} windowSize={4} />
            <HistoryBanner />
        </div>
    );
};

export default ItemHistory;
