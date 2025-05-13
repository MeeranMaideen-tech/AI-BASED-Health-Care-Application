import React from 'react';
import { useNavigate } from 'react-router-dom';

function BigVirusCard() {
  const navigate = useNavigate();

  const virusCards = [
    {
      title: "COVID-19 (Coronavirus)",
      points: [
        "Highly infectious respiratory disease.",
        "Caused by SARS-CoV-2 virus.",
        "Symptoms: fever, cough, fatigue.",
        "Loss of taste or smell.",
        "Shortness of breath and difficulty breathing.",
        "Transmission through respiratory droplets.",
        "Vaccination recommended to reduce severity.",
      ],
      bgImage: "public/images/virus1.png",
    },
    {
      title: "H1N1 Influenza (Swine Flu)",
      points: [
        "Caused by the H1N1 influenza virus.",
        "Symptoms: fever, cough, sore throat.",
        "Fatigue, body aches, and headaches.",
        "Transmission through coughing or sneezing.",
        "First detected in 2009.",
        "Prevented through vaccination.",
        "Antiviral medication can help reduce severity.",
      ],
      bgImage: "public/images/virus2.png",
    },
    {
      title: "Dengue Fever",
      points: [
        "Caused by the dengue virus.",
        "Transmitted by Aedes mosquitoes.",
        "Symptoms: high fever, headache, rash.",
        "Severe joint and muscle pain.",
        "Bleeding and bruising in severe cases.",
        "No specific antiviral treatment available.",
        "Prevention through mosquito control.",
      ],
      bgImage: "public/images/virus3.png",
    },
  ];

  const handleKnowMore = () => {
    navigate('/userportal/symptomchecker');
  };

  return (
    <div className="container mx-auto p-8 bg-blue-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Virus Information</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {virusCards.map((virus, index) => (
          <div
            key={index}
            className="relative bg-cover bg-center rounded-lg shadow-lg p-6 text-white transform transition duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundImage: `url(${virus.bgImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 bg-black/70 p-2 rounded">{virus.title}</h3>
              <ul className="space-y-2 mb-4">
                {virus.points.map((point, idx) => (
                  <li key={idx} className="flex items-center space-x-2 bg-black/30 p-1 rounded">
                    <p>{point}</p>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleKnowMore}
                className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BigVirusCard;
