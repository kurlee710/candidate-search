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
  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
