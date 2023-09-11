const HeroSection = ({ page }: { page: string }) => {
    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-600 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Discover {page} Subscription Costs Across the Globe
                    </h1>
                    <p className="text-lg text-white">
                        Find out how much it costs to subscribe to {page} in
                        different countries and explore the best plans for your
                        {page == "Netflix" && "entertainment"} needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
