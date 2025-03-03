import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import HeaderWithFilter from "../../components/layout/HeaderWithFilter";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard";

import InfiniteScroll from "react-infinite-scroll-component";
import { UserContext } from "../../context/UserContext";
import EmptyCard from "../../components/cards/EmptyCard";

import CREATE_ICON from "../../assets/images/my-poll-icon.png";

const PAGE_SIZE = 10;

const MyPolls = () => {
  // call the useUserAuth hook to ensure the user is authenticated
  useUserAuth();

  // get the user context and navigate function
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  // state variables for managing polls, stats, pagination, loading, and filters
  const [allPolls, setAllPolls] = useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");

  // function to fetch all polls from the API
  const fetchAllPolls = async (overridePage = page) => {
    if (loading) return;  // prevent multiple simultaneous requests

    setLoading(true); // set loading state to true

    try {
      // send a GET request to the API to fetch polls
      const response = await axiosInstance.get(
        `${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}&creatorId=${user._id}`
      );

      // update state with the fetched polls and stats
      if (response.data?.polls?.length > 0) {
        setAllPolls((prevPolls) =>
          overridePage === 1
            ? response.data.polls
            : [...prevPolls, ...response.data.polls]
        );
        setStats(response.data?.stats || []);
        setHasMore(response.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);  // no more polls to load
      }
    } catch (error) {
      // log any errors that occur during the request
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);  // set loading state to false
    }
  };

  // function to load more polls (for infinite scrolling)
  const loadMorePolls =()=>{
    setPage((prevPage) => prevPage + 1);
  }

  // effect to fetch polls when filterType or user changes
  useEffect(() => {
    setPage(1);
    fetchAllPolls(1);
    return () => {};
  }, [filterType, user]);

  // effect to fetch more polls when the page changes
  useEffect(() => {
    if (page !== 1) {
      fetchAllPolls();
    }
    return () => {};
  }, [page]);

  return (
    <DashboardLayout activeMenu="My Polls">
      <div className="my-5 mx-auto">
        <HeaderWithFilter
          title="My Polls"
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {/* display an empty card if there are no polls */}
        {allPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="Welcome! You're the first user of the system, and there are no polls yet. Start by creating the first poll"
            btnText="Create Poll"
            onClick={() => navigate("/create-poll")}
          />
        )}

        {/* Infinite scroll component to load more polls */}
        <InfiniteScroll
          dataLength={allPolls.length}
          next={loadMorePolls}
          hasMore={hasMore}
          loader={<h4 className="info-text">Loading...</h4>}
          // endMessage={<p className="info-text">No more polls to display.</p>}
        >
          {/* render each poll using the PollCard component */}
          {allPolls.map((poll) => (
            <PollCard
              key={`dashboard_${poll._id}`}
              pollId={poll._id}
              question={poll.question}
              type={poll.type}
              options={poll.options}
              voters={poll.voters.length || 0}
              responses={poll.responses || []}
              creatorProfileImg={poll.creator.profileImageUrl || null}
              creatorName={poll.creator.fullName}
              creatorUsername={poll.creator.username}
              userHasVoted={poll.userHasVoted || false}
              isPollClosed={poll.closed || false}
              createdAt={poll.createdAt || false}
              isMyPoll
            />
          ))}
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default MyPolls;
