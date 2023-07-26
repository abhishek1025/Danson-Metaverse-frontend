import React from 'react';
import Nav from '../components/Nav';
import SignIn from './SignIn';

const Home = () => {
    return (
        <div className="bg-gray-200">
            {/* Hero Section */}
            <div className="bg-blue-500 py-24 px-6 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Random Project</h1>
                    <p className="text-xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus felis vel dolor consectetur, non rutrum lorem elementum.</p>
                    <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded border-2 border-white hover:bg-transparent hover:text-white">
                        Get Started
                    </button>
                </div>
            </div>

            {/* Additional Section */}
            <div className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                    <p className="text-xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus felis vel dolor consectetur, non rutrum lorem elementum.</p>
                    <ul className="grid grid-cols-2 gap-4">
                        <li className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Service 1</h3>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Service 2</h3>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Service 3</h3>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                        <li className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-2">Service 4</h3>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
