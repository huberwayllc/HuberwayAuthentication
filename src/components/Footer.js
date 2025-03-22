
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {

    const location = useLocation();


    const currentYear = new Date().getFullYear();


    return (
        <>
            <footer className="footer_area footer_p_top f_bg_color">
                {/* <img className="p_absolute leaf" src="img/v.svg" alt="" />
                <img className="p_absolute f_man wow fadeInLeft" data-wow-delay="0.4s" src="img/home_two/f_man.png" alt="" />
                <img className="p_absolute f_cloud" src="img/home_two/cloud.png" alt="" />
                <img className="p_absolute f_email" src="img/home_two/email-icon.png" alt="" />
                <img className="p_absolute f_email_two" src="img/home_two/email-icon_two.png" alt="" />
                <img className="p_absolute f_man_two wow fadeInLeft" data-wow-delay="0.2s" src="img/home_two/man.png" alt="" /> */}
                <div className="footer_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <div className="f_widget subscribe_widget wow fadeInUp">
                                    <Link to="/" className="f_logo"><img src="https://cdn.psicopaticiservice.com/logo/materialeweb/logo-white.png" alt="" /></Link>
                                    {/* <h4 className="c_head">Subscribe to our newsletter</h4> */}
                                    {/* <form action="#" className="footer_subscribe_form">
                                        <input type="email" placeholder="Email" className="form-control" />
                                        <button type="submit" className="s_btn">Send</button>
                                    </form>*/}
                                    <ul className="list-unstyled menu_footer">
                                        <li><Link to="https://www.psicopatici.com">Store Online</Link></li>
                                        <li><Link to="/articles">Articoli</Link></li>
                                        <li><Link to="https://company.psicopatici.com">Company</Link></li>
                                        <li><Link to="https://psicopatici.com/privacy-policy">Privacy Policy</Link></li>
                                        <li><Link to="https://psicopatici.com/terms-conditions">Termini & Condizioni</Link></li>
                                    </ul> 
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-sm-6">
                                <div className="f_widget link_widget pl_30 wow fadeInUp" data-wow-delay="0.2s">
                                    <h3 className="f_title">Company</h3>
                                    <ul className="list-unstyled link_list">
                                        <li><Link to="#">About Us</Link></li>
                                        <li><Link to="#">Testimonials</Link></li>
                                        <li><Link to="#">Affiliates</Link></li>
                                        <li><Link to="#">Partners</Link></li>
                                        <li><Link to="#">Careers</Link></li>
                                        <li><Link to="#">Psicopatici.com for Good</Link></li>
                                        <li><Link to="#">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-6">
                                <div className="f_widget link_widget wow fadeInUp" data-wow-delay="0.4s">
                                    <h3 className="f_title">Support</h3>
                                    <ul className="list-unstyled link_list">
                                        <li><Link to="index-cool.html">Help Desk</Link></li>
                                        <li><Link to="#">Knowledge Base</Link></li>
                                        <li><Link to="#">Live Chat</Link></li>
                                        <li><Link to="#">Integrations</Link></li>
                                        <li><Link to="#">Reports</Link></li>
                                        <li><Link to="#">iOS & Android</Link></li>
                                        <li><Link to="#">Messages</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="f_widget link_widget pl_70 wow fadeInUp" data-wow-delay="0.6s">
                                    <h3 className="f_title">Doc Pages</h3>
                                    <ul className="list-unstyled link_list">
                                        <li><Link to="doclist.html">Doc Topic</Link></li>
                                        <li><Link to="#">Free Training</Link></li>
                                        <li><Link to="doc-archive.html">Doc Archive</Link></li>
                                        <li><Link to="changelog.html">Changelog</Link></li>
                                        <li><Link to="Onepage.html">Onepage Docs</Link></li>
                                        <li><Link to="#">Conversion Tracking</Link></li>
                                        <li><Link to="cheatsheet.html">Cheatseet</Link></li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                        <div className="border_bottom"></div>
                    </div>
                </div>
                <div className="footer_bottom text-center">
                    <div className="container">
                        <p>© 2020 - {currentYear} All Rights Reserved by <Link to="/">Psicopatici.com</Link></p>
                    </div>
                </div>
            </footer>


        </>
    );

}


export default Footer;