import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Play, Clock, Zap } from 'lucide-react';
import { challenges } from '../data/challenges.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import { getDifficultyColor } from '../lib/utils.js';

function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");

  const challengesList = Object.values(challenges);

  const filteredChallenges = challengesList
    .filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            challenge.description.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === "All" || challenge.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

  return (
    <div className="min-h-screen bg-base-200 font-sans selection:bg-primary selection:text-primary-content">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Coding Challenges</h1>
            <p className="text-base-content/70">Sharpen your skills with our curated list of problems.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input 
                type="text" 
                placeholder="Search challenges..." 
                className="input input-bordered pl-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="select select-bordered w-full sm:w-auto"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-content/5 group">
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <div className={`badge ${getDifficultyColor(challenge.difficulty)} badge-outline`}>
                    {challenge.difficulty}
                  </div>
                  <div className="flex items-center text-xs text-base-content/50 font-mono">
                    <Clock className="w-3 h-3 mr-1" /> 15 min
                  </div>
                </div>
                
                <h3 className="card-title text-xl mb-1 group-hover:text-primary transition-colors">
                  {challenge.title}
                </h3>
                <div className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                  {challenge.category}
                </div>
                
                <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                  {challenge.description.text}
                </p>
                
                <div className="card-actions justify-end items-center mt-auto pt-4 border-t border-base-content/10">
                  <Link to={`/challenge/${challenge.id}`} className="btn btn-primary btn-sm">
                    Solve <Play className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-base-200 rounded-full p-6 w-fit mx-auto mb-4">
              <Search className="w-10 h-10 text-base-content/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No challenges found</h3>
            <p className="text-base-content/60">Try adjusting your search or filters.</p>
            <button 
              className="btn btn-ghost mt-4"
              onClick={() => {setSearchTerm(""); setFilterDifficulty("All");}}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ChallengesPage;