import React from "react";
import '../style/footer.css'

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="content">
                <div className="container2">
                    <div className="description-box">
                        <p className="description-text">
                            This Todo List App is made with modern MERN Stack technology. It has a clean design and is easy to use.
                            it helping you organize your daily tasks quickly and smoothly.
                            Stay focused, track your progress, and boost your productivity with ease.
                        </p>
                    </div>

                    <div className="social-box">
                        <ul className="social-media">
                            <li>GitHub </li>
                            <li>LinkedIn</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>

                <p className="note">Todo App © 2025 | Built by Yogesh | All rights reserved.</p>
            </div>
        </div>
    );
}
