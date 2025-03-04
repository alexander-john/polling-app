import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import UserDetailsCard from "../cards/UserDetailsCard";
import { UserContext } from "../../context/UserContext";
import TreadingPolls from "./TreadingPolls";

const DashboardLayout = ({ children, activeMenu, stats, showStats }) => {
  // get the user context
  const { user } = useContext(UserContext);

  return (
    <div>
      {/* render the Navbar with the active menu */}
      <Navbar activeMenu={activeMenu} />

      {/* render the layout only if the user is available*/}
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>

          {/* render the UserDetailsCard and TreadingPolls on medium and larger screens */}
          <div className="hidden md:block mr-5">
            <UserDetailsCard
              profileImageUrl={user && user.profileImageUrl}
              fullname={user && user.fullName}
              username={user && user.username}
              totalPollsVotes={user && user.totalPollsVotes}
              totalPollsCreated={user && user.totalPollsCreated}
              totalPollsBookmarked={user && user.totalPollsBookmarked}
            />

            {/* render the TreadingPolls component if showStats is true and stats are available */}
            {showStats && stats?.length > 0 && <TreadingPolls stats={stats} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
