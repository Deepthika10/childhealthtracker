import React, { useState } from 'react';

// --- Helper Functions & Mock Data ---

// This is a simplified logic for demonstration. 
// A real app would use a library based on WHO growth standards.
const calculateNutritionalStatus = (child) => {
  const { age, weight, height } = child;
  
  // Example logic: Very simplified for demo purposes.
  // This logic is NOT medically accurate and is for UI demonstration only.
  let expectedWeight = 10 + (age * 1.5);
  let weightForHeightRatio = (weight / (height/100 * height/100)); // Simplified BMI

  const weightDeficiency = (weight / expectedWeight);

  if (weightDeficiency >= 0.85 && weightForHeightRatio > 16) {
    return {
      status: 'Healthy',
      color: 'green',
      message: 'Your child\'s growth is on track. Continue providing a balanced diet.',
      suggestion: 'Ensure a mix of proteins, carbohydrates, and fats in their daily meals.'
    };
  } else if (weightDeficiency >= 0.70 && weightForHeightRatio > 15) {
    return {
      status: 'Moderate Risk',
      color: 'yellow',
      message: 'Your child is moderately underweight. Please provide extra nutrition and monitor their growth.',
      suggestion: 'Increase protein intake. Give 1 boiled egg or a bowl of dal daily. Visit the Anganwadi for advice.'
    };
  } else {
    return {
      status: 'Severe Risk',
      color: 'red',
      message: 'Your child is severely underweight. Urgent action is needed.',
      suggestion: 'Immediate consultation with a doctor or health officer is recommended. Your Anganwadi worker has been alerted.'
    };
  }
};

const initialChildrenData = [
    { id: 1, name: 'Ramesh Kumar', age: 3, gender: 'Male', height: 90, weight: 9.5 },
    { id: 2, name: 'Sunita Devi', age: 4, gender: 'Female', height: 98, weight: 14 },
    { id: 3, name: 'Amit Singh', age: 2, gender: 'Male', height: 85, weight: 12 },
    { id: 4, name: 'Priya Sharma', age: 5, gender: 'Female', height: 105, weight: 13 },
];

// --- SVG Icons ---

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 100-2h-1v-1a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1z" />
  </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

// --- Components ---

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <span className="text-3xl text-green-600">🥗</span>
        <h1 className="text-2xl font-bold text-gray-800 ml-3">NutriTrack</h1>
      </div>
      <p className="text-gray-500 mt-1">Anganwadi Child Growth Monitoring</p>
    </div>
  </header>
);

const DataEntryForm = ({ onAddChild, onShowDashboard }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !height || !weight) {
      alert("Please fill all fields.");
      return;
    }
    onAddChild({
      id: Date.now(),
      name,
      age: parseInt(age),
      gender,
      height: parseFloat(height),
      weight: parseFloat(weight)
    });
    setName(''); setAge(''); setGender('Male'); setHeight(''); setWeight('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Step 1: Record Child's Growth</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Child's Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., Ramesh Kumar" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age (years)</label>
            <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 3" />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender</label>
            <select id="gender" value={gender} onChange={e => setGender(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-600">Height (cm)</label>
            <input type="number" step="0.1" id="height" value={height} onChange={e => setHeight(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 90" />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-600">Weight (kg)</label>
            <input type="number" step="0.1" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 9.5" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
            <button type="button" onClick={onShowDashboard} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2 hover:bg-gray-300 transition-colors">View Dashboard</button>
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Add Record</button>
        </div>
      </form>
    </div>
  );
};

const Dashboard = ({ childrenData, onSelectChild, onShowForm }) => {
    const statusCounts = childrenData.reduce((acc, child) => {
        const { status } = calculateNutritionalStatus(child);
        if (status === 'Healthy') acc.green++;
        else if (status === 'Moderate Risk') acc.yellow++;
        else if (status === 'Severe Risk') acc.red++;
        return acc;
    }, { green: 0, yellow: 0, red: 0 });

    const totalChildren = childrenData.length;

    const getStatusPill = (status) => {
        const colorClasses = {
            'Healthy': 'bg-green-100 text-green-800',
            'Moderate Risk': 'bg-yellow-100 text-yellow-800',
            'Severe Risk': 'bg-red-100 text-red-800',
        };
        return <span className={`px-3 py-1 text-sm font-medium rounded-full ${colorClasses[status]}`}>{status}</span>;
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Step 5: Community Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                    <h3 className="text-3xl font-bold text-green-600">{statusCounts.green}</h3>
                    <p className="text-sm font-medium text-green-700">Healthy</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                    <h3 className="text-3xl font-bold text-yellow-600">{statusCounts.yellow}</h3>
                    <p className="text-sm font-medium text-yellow-700">Moderate Risk</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                    <h3 className="text-3xl font-bold text-red-600">{statusCounts.red}</h3>
                    <p className="text-sm font-medium text-red-700">Severe Risk</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-3">All Children ({totalChildren})</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {childrenData.map(child => {
                        const { status } = calculateNutritionalStatus(child);
                        return (
                            <div key={child.id} onClick={() => onSelectChild(child)} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
                                <div>
                                    <p className="font-semibold text-gray-800">{child.name}</p>
                                    <p className="text-sm text-gray-500">{child.age} years old</p>
                                </div>
                                {getStatusPill(status)}
                            </div>
                        );
                    })}
                </div>
            </div>
             <div className="flex justify-end pt-6">
                 <button onClick={onShowForm} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-green-700 transition-colors">
                    <UserPlusIcon/>
                    Add New Child
                </button>
            </div>
        </div>
    );
};

const ChildProfile = ({ child, onBack }) => {
    if (!child) return null;
    const { status, color, message, suggestion } = calculateNutritionalStatus(child);

    const colorClasses = {
        green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', header: 'bg-green-500' },
        yellow: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-800', header: 'bg-yellow-500' },
        red: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', header: 'bg-red-500' },
    };
    const currentColors = colorClasses[color];

    return (
        <div className="bg-white rounded-lg shadow-lg animate-fade-in overflow-hidden">
            <div className={`p-4 text-white ${currentColors.header}`}>
                <h2 className="text-2xl font-bold">{child.name}</h2>
                <p>{child.age} years old, {child.gender}</p>
            </div>
            
            <div className="p-6">
                <div className={`p-4 rounded-lg border-l-4 ${currentColors.bg} ${currentColors.border}`}>
                    <h3 className={`text-lg font-bold ${currentColors.text}`}>Step 3: {status}</h3>
                    <p className="text-gray-600 mt-1">{message}</p>
                </div>

                 <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Height:</strong> {child.height} cm</p>
                        <p><strong>Weight:</strong> {child.weight} kg</p>
                    </div>
                </div>

                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Step 4: Simulated Parent Communication</h4>
                    <p className="text-sm text-gray-600">The following message would be sent to the parent via SMS/WhatsApp:</p>
                    <p className="text-sm italic bg-white p-3 rounded-md mt-2 shadow-sm">"{suggestion}"</p>
                </div>

                {color === 'red' && (
                    <div className="mt-6 bg-red-100 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                            <AlertIcon />
                            Step 6: Critical Action Alert
                        </h4>
                        <p className="text-sm text-red-700">This case is flagged as 'Severe Risk'. An automatic alert has been sent to the local health officer and partner NGO for immediate intervention.</p>
                    </div>
                )}
                
                <div className="mt-8 flex justify-end">
                    <button onClick={onBack} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
                        <ArrowLeftIcon />
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [childrenData, setChildrenData] = useState(initialChildrenData);
    const [currentView, setCurrentView] = useState('dashboard'); // 'form', 'dashboard', 'profile'
    const [selectedChild, setSelectedChild] = useState(null);

    const handleAddChild = (newChild) => {
        setChildrenData([newChild, ...childrenData]);
        setSelectedChild(newChild);
        setCurrentView('profile');
    };

    const handleSelectChild = (child) => {
        setSelectedChild(child);
        setCurrentView('profile');
    };

    const handleShowDashboard = () => {
        setSelectedChild(null);
        setCurrentView('dashboard');
    };

    const handleShowForm = () => {
        setSelectedChild(null);
        setCurrentView('form');
    }

    const renderContent = () => {
        switch (currentView) {
            case 'form':
                return <DataEntryForm onAddChild={handleAddChild} onShowDashboard={handleShowDashboard} />;
            case 'profile':
                return <ChildProfile child={selectedChild} onBack={handleShowDashboard} />;
            case 'dashboard':
            default:
                return <Dashboard childrenData={childrenData} onSelectChild={handleSelectChild} onShowForm={handleShowForm} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Header />
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {renderContent()}
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} NutriTrack. For demonstration purposes only.</p>
            </footer>
        </div>
    );
}

export default App;
