'use strict';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from "react";
import MetaTags from 'react-meta-tags';

function MetaTag(props) {
    let indexMeta;
    if(!props.index || props.page === 'error') {
        indexMeta = <meta name="robots" content="noindex" />
    }
    let title;
    let description;
    let image = props.url + '/images/servease-access-local-cross-border-services-1.png';
    switch(props.page) {
        case 'home':
            title = 'Tax, Legal, Property & Relocation - Expats, Non-Residents | ServEase';
            description = 'Expats, non-residents and NRIs - Find legal, tax, and relocation services and solutions with ServEase. ' +
                'Easy access of property buy, sell and conveyancing. Submit Capital Gains Tax and Tax refund claims.';
            break;
        case 'about-us':
            title = 'The ServEase story, Our mission, journey and background';
            description = 'Meet the team behind ServEase. We are on a mission to make the delivery of cross-border and local professional-services hassle-free and simple.';
            image = props.url + '/images/servease-access-local-cross-border-services-2.png'
            break;
        case 'contact-us':
            title = 'Contact Us - Service, Support and Media Enquiries | ServEase';
            description = 'Contact the ServEase team for legal, tax, property buy, sell, search and conveyancing queries. ' +
                'Email us for expat, NRI, non-resident, immigration or visa related matters.';
            break;
        case 'service-partner':
            title = 'Professional Service Partnership Tax and Legal | ServEase';
            description = 'Become a service partner with ServEase and provide legal, tax, immigration and relocation services to local, ' +
                'Expats, non-residents and NRI clients. Use of tech powered platform and reduced admin overhead.';
            break;
        case 'request':
            title = 'Track Request Status | ServEase';
            description = 'Track status of your request. Legal, tax, and relocation services and solutions with ServEase. ' +
                'Easy access of Property Buy, Sell and Conveyancing. Submit Capital Gains Tax and Tax Refund claims.';
            break;
        case 'terms-conditions':
            title = 'Terms and Conditions | ServEase';
            description = 'Website Terms and Conditions - Find legal, tax, and relocation services and solutions with ServEase. ' +
                'Easy access of Property Buy, Sell and Conveyancing. Submit Capital Gains Tax and Tax Refund claims.';
            break;
        case 'property-buy-sell':
            title = 'Property Buy and Sell - Residents and NRIs | ServEase';
            description = 'Hassle free Property Buy and Sell conveyancing services with ServEase. Fund remittance by NRIs to purchase property. ' +
                'Sell your house and transfer or repatriate funds. Capital Gains Tax impact.';
            break;
        case 'tax-accounting':
            title = 'Self Assessment, Tax Refund, CGT and IT Return | ServEase';
            description = 'Submit your Self Assessment return and Capital Gains Tax, CGT, with ServEase. ' +
                'ICT Tier 2 visa holders - check your eligibility to claim UK Secondment Tax Relief.';
            break;
        case 'uk-eu-relationship':
            title = 'The UK and the EU Future Relationship | ServEase';
            description = 'Apply to the settlement scheme if you or your family are from the EU. ' +
                'Prepare to make customs declarations to move goods into and out of the EU, after transition period.';
            break;
        case 'legal-document':
            title = 'Legal Documentation – Advisory and Information | ServEase';
            description = 'Power of Attorney, Last Will and Testament, Succession, Notarisation - solve your documentation needs with ServEase. ' +
                'Locals, NRIs, Expats and Non-Residents.';
            break;
        default:
            title = 'Tax, Legal, Property & Relocation - Expats, Non-Residents | ServEase';
            description = 'Expats, non-residents and NRIs - Find legal, tax, and relocation services and solutions with ServEase. ' +
                'Easy access of property buy, sell and conveyancing. Submit Capital Gains Tax and Tax refund claims.';
            image = props.url + '/images/servease-access-local-cross-border-services-1.png';
            break;
    }
    return (
        <>
            {props.page === 'error' ? (
                <MetaTags>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    {indexMeta}
                </MetaTags>
            ) : (
                <MetaTags>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    {indexMeta}

                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={image} />

                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:image" content={image} />
                    <meta property="og:image:secure_url" content={image} />
                    <meta property="og:image:alt" content={title} />
                </MetaTags>
            )}

        </>
    )
}

export default MetaTag;