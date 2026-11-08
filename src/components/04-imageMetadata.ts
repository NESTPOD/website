/**
 * Image Metadata for NestPod Models
 * Contains captions, alt text, and SEO data for all product images
 */

export interface ImageData {
  src: string;
  alt: string;
  caption: string;
  description: string;
  category: 'exterior' | 'interior' | 'detail' | 'layout' | 'logistics';
  model: string;
  featured?: boolean;
  badge?: string;
}

export const panoramaImages: ImageData[] = [
  {
    src: '/images/models/panorama/exterior-forest-day.webp',
    alt: 'PANORAMA luxury modular home nestled in forest with river view and natural integration',
    caption: 'PANORAMA Model | Forest Integration | River View',
    description:
      'Experience luxury modular living seamlessly integrated into nature, featuring premium exterior finishes, floor-to-ceiling windows, and panoramic views.',
    category: 'exterior',
    model: 'panorama',
    featured: true,
    badge: 'Featured Model',
  },
  {
    src: '/images/models/panorama/roof-detail-skylight.webp',
    alt: 'Roofline architectural detail showing integrated skylights and sustainable design elements',
    caption: 'Premium Skylights | Integrated Architecture',
    description:
      'Architectural skylights provide abundant natural light while maintaining structural efficiency. Smart thermal design reduces energy consumption.',
    category: 'detail',
    model: 'panorama',
    badge: 'Design Innovation',
  },
  {
    src: '/images/models/panorama/delivery-transport-truck.webp',
    alt: 'PANORAMA modular home being transported on specialized delivery truck, ready for installation',
    caption: 'Complete Unit Delivery | Ready to Deploy',
    description:
      'Manufactured with precision and delivered complete. Modular design enables fast deployment while maintaining structural integrity.',
    category: 'logistics',
    model: 'panorama',
    badge: 'Manufacturing Excellence',
  },
  {
    src: '/images/models/panorama/floor-plan-2br.webp',
    alt: 'PANORAMA floor plan layout showing 2-bedroom, 2-bathroom configuration with efficient space design',
    caption: 'PANORAMA Layout | 2BR/2BA | 630 sqft',
    description:
      'Efficient architectural planning maximizes luxury living in a compact, deployable footprint. Every space purposefully designed for comfort and functionality.',
    category: 'layout',
    model: 'panorama',
    badge: '630 sqft | 2 Bed, 2 Bath',
  },
  {
    src: '/images/models/panorama/kitchen-luxury-detail.webp',
    alt: 'Modern luxury kitchen interior with premium appliances, quartz countertops, and designer hardware',
    caption: 'Luxury Kitchen | Premium Finishes | Chef Quality',
    description:
      'High-end appliances, quartz countertops, and designer hardware create a chef-quality kitchen. Compact design doesn\'t compromise on sophistication.',
    category: 'interior',
    model: 'panorama',
    badge: 'Customizable Finishes',
  },
  {
    src: '/images/models/panorama/kitchen-living-space.webp',
    alt: 'Open living concept showing seamless integration of kitchen and living areas with floor-to-ceiling windows',
    caption: 'Open Living | Kitchen + Lounge | Natural Light',
    description:
      'Seamless flow between kitchen and living areas creates an airy, sophisticated living experience. Floor-to-ceiling windows bathe spaces in natural light.',
    category: 'interior',
    model: 'panorama',
    badge: 'Open Concept Design',
  },
  {
    src: '/images/models/panorama/bedroom-master-skylight.webp',
    alt: 'Luxurious master bedroom with integrated skylight, premium bedding, and abundant natural light',
    caption: 'Master Suite | Skylight | Premium Comfort',
    description:
      'Luxurious bedroom sanctuary with integrated skylight system, premium furnishings, and ample natural light. Smart climate control ensures year-round comfort.',
    category: 'interior',
    model: 'panorama',
    badge: 'Master Suite',
  },
  {
    src: '/images/models/panorama/bathroom-detail.webp',
    alt: 'Spa-quality bathroom with premium fixtures, intelligent mirror, and rainfall shower system',
    caption: 'Spa Bathroom | Smart Features | Luxury Finishes',
    description:
      'Full-featured spa bathroom with premium fixtures, intelligent mirror technology, and rainfall shower. Every detail curated for luxury and functionality.',
    category: 'detail',
    model: 'panorama',
    badge: 'Smart Technology',
  },
  {
    src: '/images/models/panorama/bedroom-interior-light.webp',
    alt: 'Bright bedroom interior bathed in natural light from integrated skylights, showing modern design',
    caption: 'Natural Light | Bedroom Design | Skylight Architecture',
    description:
      'Bedroom bathed in natural light through integrated skylight system, creating an airy, premium atmosphere. Smart design maximizes comfort and energy efficiency.',
    category: 'interior',
    model: 'panorama',
    badge: 'Daylight Architecture',
  },
];

// Export all model images mapped by type
export const getModelImages = (modelName: string): ImageData[] => {
  switch (modelName) {
    case 'panorama':
      return panoramaImages;
    // Add other models as they get photographed
    // case 'cove': return coveImages;
    // case 'dune': return duneImages;
    default:
      return [];
  }
};

/**
 * Get featured images across all models
 */
export const getFeaturedImages = (): ImageData[] => {
  return panoramaImages.filter((img) => img.featured);
};

/**
 * Get images by category
 */
export const getImagesByCategory = (
  modelName: string,
  category: ImageData['category']
): ImageData[] => {
  return getModelImages(modelName).filter((img) => img.category === category);
};

/**
 * Next.js Image component props generator
 */
export interface NextImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes: string;
}

export const getNextImageProps = (
  imageData: ImageData,
  priority = false
): NextImageProps => {
  return {
    src: imageData.src,
    alt: imageData.alt,
    width: 1920,
    height: 1080,
    priority,
    sizes:
      '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1200px',
  };
};
