import React, { useState } from 'react';
import { BarChart3, Trophy, Users, MapPin } from 'lucide-react';

// Sample IPL data (in a real app, this would come from an API)
const iplData = {
  topTeams: [
    { name: 'Mumbai Indians', titles: 5, winRate: 57.2 },
    { name: 'Chennai Super Kings', titles: 5, winRate: 59.8 },
    { name: 'Kolkata Knight Riders', titles: 2, winRate: 51.4 },
  ],
  topPlayers: [
    { name: 'Virat Kohli', runs: 6624, avg: 36.2 },
    { name: 'Shikhar Dhawan', runs: 6244, avg: 34.8 },
    { name: 'Rohit Sharma', runs: 5879, avg: 30.3 },
  ],
  venues: [
    { name: 'Eden Gardens', matches: 81, avgScore: 165 },
    { name: 'Wankhede Stadium', matches: 75, avgScore: 172 },
    { name: 'Chinnaswamy Stadium', matches: 70, avgScore: 180 },
  ]
};

function StatCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('teams');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8" />
              <h1 className="text-2xl font-bold">IPL Analytics Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {['teams', 'players', 'venues'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'teams' && (
            <>
              <StatCard title="Top Teams" icon={Trophy}>
                <div className="space-y-4">
                  {iplData.topTeams.map((team) => (
                    <div key={team.name} className="flex justify-between items-center">
                      <span className="font-medium">{team.name}</span>
                      <div className="text-sm">
                        <span className="text-indigo-600 font-bold">{team.titles}</span> titles
                      </div>
                    </div>
                  ))}
                </div>
              </StatCard>
              
              <StatCard title="Win Rates" icon={BarChart3}>
                <div className="space-y-4">
                  {iplData.topTeams.map((team) => (
                    <div key={team.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{team.name}</span>
                        <span className="font-medium">{team.winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 rounded-full h-2"
                          style={{ width: `${team.winRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </StatCard>
            </>
          )}

          {activeTab === 'players' && (
            <StatCard title="Top Run Scorers" icon={Users}>
              <div className="space-y-4">
                {iplData.topPlayers.map((player) => (
                  <div key={player.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-indigo-600 font-bold">{player.runs}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Average: {player.avg}
                    </div>
                  </div>
                ))}
              </div>
            </StatCard>
          )}

          {activeTab === 'venues' && (
            <StatCard title="Popular Venues" icon={MapPin}>
              <div className="space-y-4">
                {iplData.venues.map((venue) => (
                  <div key={venue.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{venue.name}</span>
                      <span className="text-indigo-600 font-bold">{venue.matches} matches</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Avg. Score: {venue.avgScore}
                    </div>
                  </div>
                ))}
              </div>
            </StatCard>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;