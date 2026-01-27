import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image }) => {
    const siteTitle = 'Md. Aman Uddin Siyam | Machine Learning Engineer';
    const defaultDescription = 'Portfolio of Md. Aman Uddin Siyam, a final-year CSE student specializing in AI, Deep Learning, and Computer Vision.';
    const siteUrl = 'https://aman-uddin-siyam-portfolio.vercel.app'; // Replace with actual URL

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | Md. Aman Uddin Siyam` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteUrl} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;
