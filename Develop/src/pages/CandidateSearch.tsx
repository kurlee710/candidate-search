import { useEffect, useState } from "react";
import { searchGithubUsers } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const usernames = [
          "octocat",
          "torvalds",
          "gaearon",
          "paolanayala",
          "Theon87",
        ]; // You can make this dynamic
        const userData = await searchGithubUsers(usernames);
        setCandidates(userData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const currentCandidate = candidates[currentCandidateIndex];
    setSavedCandidates((prev) => [...prev, currentCandidate]);
    nextCandidate();
  };

  const skipCandidate = () => {
    nextCandidate();
  };

  const nextCandidate = () => {
    setCurrentCandidateIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem("savedCandidates");
    if (savedCandidatesFromStorage) {
      setSavedCandidates(JSON.parse(savedCandidatesFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentCandidate = candidates[currentCandidateIndex];

  if (!currentCandidate) {
    return <p>No more candidates to review.</p>;
  }

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>
      <img
        className="avatar"
        src={currentCandidate.avatar_url}
        alt={currentCandidate.name}
      />
      <h2>
        {currentCandidate.name} ({currentCandidate.login})
      </h2>
      <p>Location: {currentCandidate.location}</p>
      <p>
        Email:{" "}
        <a href={`mailto:${currentCandidate.email}`}>
          {currentCandidate.email}
        </a>
      </p>
      <p>Company: {currentCandidate.company}</p>
      <p>Bio: {currentCandidate.bio}</p>

      <div className="button-container">
        <button onClick={skipCandidate}>Skip</button>
        <button onClick={saveCandidate}>Save</button>
      </div>

      {/* Display saved candidates count */}
      <p>{savedCandidates.length} candidates saved.</p>
    </div>
  );
};

export default CandidateSearch;
