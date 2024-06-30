import React from 'react';

const Nav = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-center items-center text-center">
                <div className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-4xl xl:text-6xl font-bold">
                    <div className="sm:block">
                        <span className="text-green-200">City Medical</span>
                    </div>
                    <div className="sm:block">
                        <span className="text-yellow-300">& Cerjical</span>
                        <span className="text-pink-200"> Complex</span>
                        <span className="text-blue-200"> Jatoi</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
