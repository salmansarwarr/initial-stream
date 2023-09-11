const GuidePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Guide</h1>
        <p className="mb-6">
          Welcome to the Guide section! Here, we provide you with a step-by-step guide on how to use our website to explore Netflix plans and pricing from different countries.
        </p>
        <ol className="list-decimal pl-6 mb-6">
          <li className="mb-2">
            Choose Your Currency: On the homepage, select your preferred currency from the dropdown menu. This will set the currency in which the Netflix plans will be displayed throughout the website.
          </li>
          <li className="mb-2">
            Select Plans: Next, choose the Netflix plans you are interested in comparing. You can select one or more plans based on your preferences (e.g., Mobile, Basic, Standard, Premium).
          </li>
          <li className="mb-2">
            Explore Plans: Once you've chosen your currency and selected plans, You will be directed to the summary page, where you can view the cheapest plans for each selected option.
          </li>
          <li className="mb-2">
            Summary Table: The summary table displays the cheapest plans for each option in different countries. You can quickly compare the prices and make an informed decision about your Netflix subscription.
          </li>
          <li className="mb-2">
            Sorting: Click on the sort button to sort the table based on ascending or descending prices for each plan.
          </li>
        </ol>
        <p className="mb-6">
          We hope this guide helps you navigate our website effectively. If you have any questions or need further assistance, feel free to reach out to us through the provided contact form or email. Happy exploring!
        </p>
      </div>
    </div>
  );
};

export default GuidePage;
