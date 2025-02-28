import { useState, useEffect } from "react";

const SportsCard = ({ sport, gender, details, image }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Disable background scrolling when the popover is open
    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDialogOpen]);

    const handleViewMore = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // Show only the first 2 details in the card
    const visibleDetails = details.slice(0, 2);
    const isMixed = gender.toLowerCase() === "men & women";

    return (
        <div className="flex flex-col md:flex-row border p-4 rounded-lg shadow-md md:w-card w-mdcard mb-10">
            <div className="flex flex-col items-center justify-center">
                <img src={image} alt={sport} className="w-60 md:w-5/6 rounded-lg shadow-lg" />
            </div>
            <div className="w-full md:w-2/3 p-3 flex flex-col items-center md:items-start">
                <h2 className="text-3xl">{sport}</h2>
                <p className="text-gray-800 font-bold">{gender.toUpperCase()}</p>
                <ul className="list-disc list-inside text-gray-700">
                    {visibleDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                    {details.length > 2 && (
                        <li className="text-secondary font-bold cursor-pointer" onClick={handleViewMore}>
                            View more...
                        </li>
                    )}
                </ul>
                {/* Gender Buttons */}
                <div className="mt-4">
                    {isMixed ? (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                            <button className="border-2 rounded-lg border-primary text-primary px-4 py-2 font-bold cursor-default">
                                Men
                            </button>
                            <button className="border-2 rounded-lg border-primary text-primary px-4 py-2 font-bold cursor-default">
                                Women
                            </button>
                        </div>
                    ) : (
                        <button className="border-2 rounded-lg border-primary text-primary px-4 py-2 font-bold mt-3 cursor-default">
                            {gender}
                        </button>
                    )}
                </div>
            </div>

            {/* Popover Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Blurred Background */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleCloseDialog}></div>

                    {/* Dialog Content */}
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-[90%] max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-col items-center justify-center">
                            <img src={image} alt={sport} className="w-40 md:w-2/5 rounded-lg shadow-lg" />
                        </div>
                        <div className="mx-4 mt-8">
                            <h2 className="text-2xl font-bold mb-2">{sport}</h2>
                            <p className="text-gray-700 mb-2">{gender.toUpperCase()}</p>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                                {details.map((detail, index) => (
                                    <li key={index} className="text-sm text-justify pb-2">{detail}</li>
                                ))}
                            </ul>
                            <button onClick={handleCloseDialog} className="bg-primary text-white px-4 py-2 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SportsCard;
