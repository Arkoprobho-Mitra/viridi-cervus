/**
 * categoryMap.js
 * Maps the Navbar taxonomy (headings & items) → actual `category` field values
 * in the product embeddings data.
 *
 * Structure:
 *   SUBCATEGORY_MAP : navbarSubCategory → [data category values…]
 *   CATEGORY_MAP    : navbarCategoryHeading → [data category values…]
 *
 * The search service uses these to expand filter terms before exact-matching
 * against p.category in the embeddings.
 */

export const SUBCATEGORY_KEYWORD_MAP = {
    'Casual Shirts': 'casual',
    'Formal Shirts': 'formal',
    'Casual Trousers': 'casual',
    'Formal Trousers': 'formal',
    'Formal Shoes': 'formal',
    'Sneakers': 'sneaker',
    'Sports Shoes & Floaters': 'sports'
};

// Maps each navbar subCategory item → array of matching data category values
export const SUBCATEGORY_MAP = {
    // ── Men: Topwear ─────────────────────────────────────────────────────────
    'T-Shirts':           ['Tshirts'],
    'Casual Shirts':      ['Shirts'],
    'Formal Shirts':      ['Shirts'],
    'Sweatshirts':        ['Sweatshirts'],
    'Sweaters':           ['Sweaters'],
    'Jackets':            ['Jackets'],
    'Blazers & Coats':    ['Blazers'],
    'Suits':              ['Suits'],
    'Rain Jackets':       ['Jackets'],

    // ── Men: Indian & Festive Wear ────────────────────────────────────────────
    'Kurtas & Kurta Sets': ['Kurtas', 'Kurta Sets'],
    'Sherwanis':           ['Sherwani'],
    'Nehru Jackets':       ['Nehru Jackets'],
    'Dhotis':              ['Dhotis'],

    // ── Men: Bottomwear ───────────────────────────────────────────────────────
    'Jeans':               ['Jeans'],
    'Casual Trousers':     ['Trousers'],
    'Formal Trousers':     ['Trousers'],
    'Shorts':              ['Shorts'],
    'Track Pants & Joggers': ['Track Pants', 'Tracksuits'],

    // ── Men: Innerwear & Sleepwear ────────────────────────────────────────────
    'Briefs & Trunks':       ['Briefs', 'Trunk'],
    'Boxers':                ['Boxers'],
    'Vests':                 ['Innerwear Vests'],
    'Sleepwear & Loungewear':['Pyjamas', 'Night Suits', 'Lounge Pants', 'Lounge Shorts', 'Lounge Tshirts', 'Nightdress'],
    'Thermals':              ['Thermal Tops', 'Thermal Bottoms', 'Thermal Set'],

    // ── Men/Women: Footwear ───────────────────────────────────────────────────
    'Casual Shoes':          ['Casual Shoes'],
    'Sports Shoes':          ['Sports Shoes'],
    'Formal Shoes':          ['Casual Shoes'],
    'Sneakers':              ['Casual Shoes', 'Sports Shoes'],
    'Sandals & Floaters':    ['Sandals', 'Sports Sandals'],
    'Flip Flops':            ['Flip Flops'],
    'Socks':                 ['Socks'],

    // ── Women: Indian & Fusion Wear ───────────────────────────────────────────
    'Kurtas & Suits':                 ['Kurtas', 'Kurta Sets'],
    'Kurtis Tunics & Tops':           ['Kurtis', 'Tunics'],
    'Sarees':                         ['Sarees'],
    'Ethnic Wear':                    ['Ethnic Dresses'],
    'Leggings Salwars & Churidars':   ['Leggings', 'Salwar', 'Churidar'],
    'Skirts & Palazzos':              ['Skirts', 'Palazzos'],
    'Dress Materials':                ['Salwar'],
    'Lehenga Cholis':                 ['Lehenga Choli'],
    'Dupattas & Shawls':              ['Dupatta', 'Scarves'],
    // 'Jackets' already mapped above

    // ── Women: Western Wear ───────────────────────────────────────────────────
    'Dresses':               ['Dresses'],
    'Tops':                  ['Tops'],
    'Tshirts':               ['Tshirts'],
    'Trousers & Capris':     ['Trousers', 'Capris'],
    'Shorts & Skirts':       ['Shorts', 'Skirts'],
    'Co-ords':               ['Co Ords'],
    'Playsuits':             ['Jumpsuit'],
    'Jumpsuits':             ['Jumpsuit'],
    'Shrugs':                ['Shrug'],
    'Sweaters & Sweatshirts':['Sweaters', 'Sweatshirts'],
    'Jackets & Coats':       ['Jackets'],
    'Blazers & Waistcoats':  ['Blazers'],

    // ── Women: Footwear ───────────────────────────────────────────────────────
    'Flats':                 ['Flats'],
    'Heels':                 ['Heels'],
    'Boots':                 ['Casual Shoes'],
    'Sports Shoes & Floaters': ['Sports Shoes', 'Sports Sandals'],

    // ── Women: Lingerie & Sleepwear ───────────────────────────────────────────
    'Bra':                   ['Bra'],
    'Briefs':                ['Briefs'],
    'Shapewear':             ['Shapewear'],
    'Swimwear':              ['Swimwear', 'Swim Tops', 'Swim Bottoms'],
    'Camisoles & Thermals':  ['Camisoles', 'Thermal Set', 'Thermal Tops', 'Thermal Bottoms'],

    // ── Beauty ───────────────────────────────────────────────────────────────
    'Makeup':                ['Foundation', 'Concealer', 'Face Primer', 'Compact', 'Lipstick', 'Lip Gloss', 'Lip Liner', 'Mascara', 'Kajal And Eyeliner', 'Eyeshadow', 'Nail Polish', 'Highlighter And Blush', 'Makeup Brushes', 'Makeup Remover', 'Makeup Gift Set'],
    'Skincare':              ['Face Moisturisers', 'Face Wash And Cleanser', 'Mask And Peel', 'Sunscreen', 'Face Serum And Gel', 'Eye Cream', 'Face Scrub And Exfoliator', 'Toner', 'Facial Kit', 'Skin Care Gift Set'],
    'Premium Beauty':        ['Beauty Gift Set', 'Fragrance Gift Set', 'Makeup Gift Set', 'Skin Care Gift Set'],
    'Lipsticks':             ['Lipstick', 'Lip Gloss', 'Lip Liner'],
    'Fragrances':            ['Perfume And Body Mist', 'Deodorant', 'Fragrance Gift Set'],
    'Skincare, Bath & Body': ['Face Moisturisers', 'Face Wash And Cleanser', 'Body Lotion', 'Body Wash And Scrub', 'Body Oil', 'Lip Care', 'Eye Cream', 'Toner', 'Sunscreen'],

    // ── Accessories ──────────────────────────────────────────────────────────
    'Men Watches':           ['Watches', 'Smart Watches'],
    'Women Watches':         ['Watches', 'Smart Watches'],
    'Kids Watches':          ['Watches', 'Smart Watches'],
    'Fashion Jewellery':     ['Earrings', 'Necklace And Chains', 'Bracelet', 'Ring', 'Bangle', 'Jewellery Set', 'Anklet', 'Toe Rings', 'Head Jewellery', 'Mangalsutra', 'Pendant'],
    'Fine Jewellery':        ['Earrings Gold', 'Ring Gold', 'Pendant Gold'],
    'Belts':                 ['Belts'],
    'Wallets':               ['Wallets'],
    'Scarves':               ['Scarves', 'Dupatta'],
    'Caps & Hats':           ['Caps', 'Hat'],

    // ── Kids: Boys ───────────────────────────────────────────────────────────
    'T-Shirts':              ['Tshirts'],
    'Shirts':                ['Shirts'],
    'Clothing Sets':         ['Clothing Set'],
    'Ethnic Wear':           ['Ethnic Dresses', 'Kurta Sets'],
    'Track Pants & Pyjamas': ['Track Pants', 'Pyjamas'],
    'Jacket, Sweater & Sweatshirts': ['Jackets', 'Sweaters', 'Sweatshirts'],
    'Party Wear':            ['Dresses', 'Suits'],
    'Innerwear & Thermals':  ['Briefs', 'Innerwear Vests', 'Thermal Set'],
    'Nightwear & Loungewear':['Night Suits', 'Pyjamas', 'Lounge Pants'],
    'Value Packs':           ['Briefs', 'Tshirts'],

    // ── Kids: Girls ──────────────────────────────────────────────────────────
    'Lehenga Choli':         ['Lehenga Choli'],
    'Kurta Sets':            ['Kurta Sets'],
    'Party wear':            ['Dresses'],
    'Dungarees & Jumpsuits': ['Dungarees', 'Jumpsuit'],
    'Skirts & shorts':       ['Skirts', 'Shorts'],
    'Tights & Leggings':     ['Tights', 'Leggings'],
    'Jeans, Trousers & Capris': ['Jeans', 'Trousers', 'Capris'],

    // ── Kids: Footwear ────────────────────────────────────────────────────────
    'Flipflops':             ['Flip Flops'],
    'Sandals':               ['Sandals'],
    'School Shoes':          ['Casual Shoes'],

    // ── Kids: Toys ────────────────────────────────────────────────────────────
    'Learning & Development': ['Learning And Development Toys'],
    'Activity Toys':          ['Activity Toys And Games'],
    'Soft Toys':              ['Soft Toys And Dolls'],
    'Action Figure / Play set': ['Construction Toys', 'Toy Vehicles', 'Musical Toys'],

    // ── Kids: Infants ─────────────────────────────────────────────────────────
    'Bodysuits':             ['Bodysuit'],
    'Rompers & Sleepsuits':  ['Rompers'],
    'Tshirts & Tops':        ['Tshirts', 'Tops'],
    'Bottom wear':           ['Shorts', 'Trousers'],
    'Winter Wear':           ['Jackets', 'Sweaters', 'Sweatshirts'],
    'Innerwear & Sleepwear': ['Briefs', 'Night Suits', 'Pyjamas'],
    'Infant Care':           ['Baby Care Products'],
};

// Maps each navbar category heading → array of matching data category values
export const CATEGORY_MAP = {
    'Topwear': ['Tshirts', 'Shirts', 'Sweatshirts', 'Sweaters', 'Jackets', 'Blazers', 'Suits'],
    'Indian & Festive Wear': ['Kurtas', 'Kurta Sets', 'Sherwani', 'Nehru Jackets', 'Dhotis'],
    'Bottomwear': ['Jeans', 'Trousers', 'Shorts', 'Track Pants', 'Tracksuits', 'Capris'],
    'Innerwear & Sleepwear': ['Briefs', 'Trunk', 'Boxers', 'Innerwear Vests', 'Pyjamas', 'Night Suits', 'Lounge Pants', 'Lounge Shorts', 'Lounge Tshirts', 'Nightdress', 'Thermal Tops', 'Thermal Bottoms', 'Thermal Set'],
    'Footwear': ['Casual Shoes', 'Sports Shoes', 'Sandals', 'Sports Sandals', 'Flip Flops', 'Socks', 'Flats', 'Heels'],
    'Indian & Fusion Wear': ['Kurtas', 'Kurta Sets', 'Kurtis', 'Tunics', 'Sarees', 'Ethnic Dresses', 'Leggings', 'Salwar', 'Churidar', 'Skirts', 'Palazzos', 'Lehenga Choli', 'Dupatta', 'Scarves'],
    'Western Wear': ['Dresses', 'Tops', 'Tshirts', 'Jeans', 'Trousers', 'Capris', 'Shorts', 'Skirts', 'Co Ords', 'Jumpsuit', 'Shrug', 'Sweaters', 'Sweatshirts', 'Jackets', 'Blazers'],
    'Lingerie & Sleepwear': ['Bra', 'Briefs', 'Shapewear', 'Pyjamas', 'Night Suits', 'Nightdress', 'Swimwear', 'Swim Tops', 'Swim Bottoms', 'Camisoles', 'Thermal Set', 'Thermal Tops', 'Thermal Bottoms', 'Lingerie Set', 'Lingerie Accessories'],
    'Beauty & Personal Care': ['Foundation', 'Concealer', 'Face Primer', 'Compact', 'Lipstick', 'Lip Gloss', 'Lip Liner', 'Mascara', 'Kajal And Eyeliner', 'Eyeshadow', 'Nail Polish', 'Face Moisturisers', 'Face Wash And Cleanser', 'Sunscreen', 'Face Serum And Gel', 'Body Lotion', 'Body Wash And Scrub', 'Perfume And Body Mist', 'Deodorant'],
    'Makeup': ['Foundation', 'Concealer', 'Face Primer', 'Compact', 'Lipstick', 'Lip Gloss', 'Lip Liner', 'Mascara', 'Kajal And Eyeliner', 'Eyeshadow', 'Nail Polish', 'Highlighter And Blush', 'Makeup Brushes', 'Makeup Remover', 'Makeup Gift Set', 'Bb And Cc Cream'],
    'Skincare, Bath & Body': ['Face Moisturisers', 'Face Wash And Cleanser', 'Mask And Peel', 'Sunscreen', 'Face Serum And Gel', 'Eye Cream', 'Lip Care', 'Body Lotion', 'Body Wash And Scrub', 'Body Oil', 'Face Scrub And Exfoliator', 'Toner', 'Facial Kit'],
    'Haircare': ['Shampoo And Conditioner', 'Hair Cream And Mask', 'Hair Oil', 'Hair Gel And Spray', 'Hair Colour', 'Hair Serum', 'Hair Spray', 'Hair Accessory', 'Hair Appliance', 'Hair Brush And Comb', 'Hair Masks', 'Hair Care Kit'],
    'Fragrances': ['Perfume And Body Mist', 'Deodorant', 'Fragrance Gift Set'],
    'Appliances': ['Hair Appliance', 'Epilator', 'Trimmer'],
    'Watches': ['Watches', 'Smart Watches', 'Watch Gift Set'],
    'Jewellery': ['Earrings', 'Necklace And Chains', 'Bracelet', 'Ring', 'Bangle', 'Jewellery Set', 'Anklet', 'Toe Rings', 'Head Jewellery', 'Mangalsutra', 'Pendant', 'Earrings Gold', 'Ring Gold', 'Pendant Gold'],
    'Belts, Scarves & More': ['Belts', 'Wallets', 'Scarves', 'Dupatta', 'Caps', 'Hat', 'Sunglasses'],
    'Boys Clothing': ['Tshirts', 'Shirts', 'Shorts', 'Jeans', 'Trousers', 'Clothing Set', 'Ethnic Dresses', 'Kurta Sets', 'Track Pants', 'Jackets', 'Sweaters', 'Sweatshirts', 'Dresses', 'Suits', 'Briefs', 'Innerwear Vests', 'Night Suits', 'Pyjamas', 'Lounge Pants'],
    'Girls Clothing': ['Dresses', 'Tops', 'Tshirts', 'Clothing Set', 'Lehenga Choli', 'Kurta Sets', 'Jumpsuit', 'Dungarees', 'Skirts', 'Shorts', 'Tights', 'Leggings', 'Jeans', 'Trousers', 'Capris', 'Jackets', 'Sweaters', 'Sweatshirts', 'Briefs', 'Night Suits', 'Pyjamas'],
    'Toys & Games': ['Learning And Development Toys', 'Activity Toys And Games', 'Soft Toys And Dolls', 'Construction Toys', 'Toy Vehicles', 'Musical Toys'],
    'Infants': ['Bodysuit', 'Rompers', 'Clothing Set', 'Tshirts', 'Tops', 'Dresses', 'Shorts', 'Trousers', 'Jackets', 'Sweaters', 'Sweatshirts', 'Briefs', 'Night Suits', 'Pyjamas', 'Baby Care Products'],
};

/**
 * Resolves a navbar category heading to a Set of matching data category strings.
 * Returns null if no mapping found (meaning "no category filter").
 */
export function resolveCategory(navbarCategory) {
    if (!navbarCategory) return null;
    // 1. Try exact mapping in CATEGORY_MAP
    if (CATEGORY_MAP[navbarCategory]) {
        return new Set(CATEGORY_MAP[navbarCategory]);
    }
    // 2. Fallback: treat as direct data category (case-sensitive)
    return new Set([navbarCategory]);
}

/**
 * Resolves a navbar subCategory item to a Set of matching data category strings.
 * Returns null if no mapping found (meaning "no subCategory filter").
 */
export function resolveSubCategory(navbarSubCategory) {
    if (!navbarSubCategory) return null;
    if (SUBCATEGORY_MAP[navbarSubCategory]) {
        return new Set(SUBCATEGORY_MAP[navbarSubCategory]);
    }
    // Fallback: direct data category match
    return new Set([navbarSubCategory]);
}

/**
 * Resolves a navbar subCategory to an implicit search keyword.
 * For example, "Formal Shirts" -> "formal".
 * Returns null if no implicit keyword is needed.
 */
export function resolveKeyword(navbarSubCategory) {
    if (!navbarSubCategory) return null;
    return SUBCATEGORY_KEYWORD_MAP[navbarSubCategory] || null;
}
