import React from 'react'

import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__links">
                    <a href="#" className="footer__link">Support</a>
                    <a href="#" className="footer__link">Learning</a>
                    <a href="#" className="footer__link">Русская версия</a>
                </div>
                <span>© 2021 Alexandr Bulgatov</span>
            </div>
        </footer>
    )
}

export default Footer