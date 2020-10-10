'use strict';

import React, {useState} from 'react';
import Slider from "react-slick";
import 'scss/components/slider.scss';
import Title from "./title";

function SimpleSlider(props) {
    let promotions = [
        {"id":"5ed79f6136b89611afc3229b","sequence":1,"title":"Simple tax guide in India on real estate sale","blog":"If you have a property in India and you are considering selling it, then, as per Indian Income-tax Act, you may need to pay tax to the Government. This is commonly known as Capital Gains Tax.\n" +
                "In this article we shall discuss the definition and calculation of Capital Gains Tax, deduction of the tax, and finally, tax exemptions and reliefs. ","banner":"nri-invest-in-india.jpg", "link":"https://blogs.servease.io/2020/01/22/a-simple-guide-to-tax-implications-in-india-on-sale-of-immovable-property-real-estate/"},
        {"id":"5ed79f6136b89611afc3229b","sequence":2,"title":"Tax in the UK on foreign (Indian) income","blog":"Members of Indian diaspora often enquire about tax impact in the UK on Indian income. In this article we discuss with an example.\n" +
                "What is the tax liability in the UK of an individual who has foreign incomes in India from NRO (Not-Resident Ordinary) and NRE (Non-Resident External) bank accounts? ","banner":"income-tax-calculator-accounting-financial.jpg", "link":"https://blogs.servease.io/2020/07/04/tax-in-the-uk-on-foreign-indian-income/"},
        {"id":"5ed79f6136b89611afc3229b","sequence":3,"title":"Estate planning of your digital assets","blog":"What happens to our digital assets once we pass away? Unlike physical assets such as property, gold or cash, our digital assets can’t be transferred to the legal heirs or successors through Wills or rules of succession.\n" +
                "How can the digital assets be handed over to our loved ones? ","banner":"estate-planning-of-digital-assets.jpg", "link":"https://blogs.servease.io/2020/04/07/estate-planning-of-your-digital-assets/"}
    ]

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: '0px'
    };

    return(
        <div className="promotionframe">
            <div className="promotiongroup">
                <Title message="Useful Articles" />
                <Slider {...settings}>
                    {props.promotionData.map((item, index) => (
                        <div key={index} className="promotion">
                            <div className="promotionbanner">
                                <img src={'/images/' + item.banner} />
                            </div>
                            <div className="promotiondetail">
                                <p className="promotiontitle">
                                    {item.title}
                                </p>
                                <p className="promotionblog">
                                    {item.blog} <a target="blank" href={item.link}>Read More</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default SimpleSlider;