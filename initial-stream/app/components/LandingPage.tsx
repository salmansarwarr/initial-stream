import Link from "next/link";
import netflix from "../images/netflix-icon.png";
import iCloud from "../images/iCloud.png";
import Image from "next/image";

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-600 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 px-2 text-center">
                Welcome to Your Ultimate Streaming Service Guide
            </h1>
            <h2 className="text-2xl font-semibold mb-8">
                Select a Streaming Service
            </h2>

            <div className="flex space-x-4">
                <Link href="/netflix">
                    <p className="group flex flex-col items-center justify-center px-4 py-6 border border-gray-300 rounded-lg hover:border-blue-500 transition duration-300 ease-in-out">
                        <Image
                            src={netflix}
                            alt="Netflix"
                            height={100}
                            width={100}
                            className="w-16 h-16 mb-2"
                        />
                        Netflix
                    </p>
                </Link>
                <Link href="/icloud">
                    <p className="group flex flex-col items-center justify-center px-4 py-6 border border-gray-300 rounded-lg hover:border-blue-500 transition duration-300 ease-in-out">
                        <Image
                            src={iCloud}
                            alt="iCloud"
                            height={100}
                            width={100}
                            className="w-16 h-16 mb-2"
                        />
                        iCloud
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
