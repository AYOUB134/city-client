import React from 'react';

const Nav = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto text-center">
                <div className="text-white font-bold">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        <span className="text-green-200">City Medical</span>
                        <span className="text-yellow-300"> & Cerjical</span>
                        <span className="text-pink-200"> Complex</span>
                        <span className="text-blue-200"> Jatoi</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-2 font-normal">
                        <span className="text-green-200">C.E.O</span>
                        <span className="text-yellow-300"> DR</span>
                        <span className="text-pink-200"> ZAFFAR</span>
                        <span className="text-blue-200"> ABBAS SITHARI</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

