import React from 'react';

const BodyAvatar = ({
    shape = 'hourglass',
    gender = 'female',
    productImage = null,
    productCategory = '',
    skinTone = '#F0C8A0', // Unused for photorealistic models
}) => {
    // Map nonbinary to female for the model base
    const gKey = gender === 'nonbinary' ? 'f' : gender === 'male' ? 'm' : 'f';
    const sKey = shape || 'hourglass';

    const modelImageSrc = `/models/model_${gKey}_${sKey}.png`;

    // Determine overlay positioning based on product category
    const cat = (productCategory || '').toLowerCase();
    let overlayStyle = {
        top: '22%',
        height: '45%',
        left: '20%',
        right: '20%',
    }; // Default to Tops / Shirts

    if (cat.includes('pant') || cat.includes('jeans') || cat.includes('bottom') || cat.includes('trouser') || cat.includes('skirt') || cat.includes('short')) {
        // Bottoms
        overlayStyle = {
            top: '55%',
            height: '45%',
            left: '22%',
            right: '22%',
        };
    } else if (cat.includes('dress') || cat.includes('gown') || cat.includes('jumpsuit') || cat.includes('suit')) {
        // Full body
        overlayStyle = {
            top: '22%',
            height: '75%',
            left: '18%',
            right: '18%',
        };
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Model Background */}
            <img
                src={modelImageSrc}
                alt={`${gender} ${shape} model`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '8px'
                }}
            />

            {/* Garment Overlay */}
            {productImage && (
                <div style={{
                    position: 'absolute',
                    ...overlayStyle,
                    backgroundImage: `url(${productImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mixBlendMode: 'multiply',
                    opacity: 0.88,
                    borderRadius: '10%',
                    pointerEvents: 'none',
                    // A subtle mask to soften the edges so it blends better with the model's body
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                }} />
            )}
        </div>
    );
};

export default BodyAvatar;
