import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image }) => {
    const siteTitle = 'John Doe | Full Stack Developer';
    const defaultDescription = 'Portfolio of John Doe, a Full Stack Developer specializing in the MERN stack and modern UI/UX design.';
    const siteUrl = 'https://johndoe.com'; // Replace with actual URL

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | John Doe` : siteTitle}</title>
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
