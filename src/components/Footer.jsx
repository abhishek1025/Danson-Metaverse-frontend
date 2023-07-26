import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 px-6 text-center">
            <div className="flex flex-wrap items-end justify-center gap-10">
                <div>
                    <span className="text-sm">&copy; 2023 Your Company. All rights reserved.</span>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="#" className="text-sm text-white hover:text-gray-400">Terms of Service</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-sm text-white hover:text-gray-400">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-sm text-white hover:text-gray-400">Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
