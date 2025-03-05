// Summary:
// This file defines the UserDetailsCard component, which displays detailed information about a user.
// It includes the user's profile picture, full name, username, and statistics such as the total number of polls created, voted on, and bookmarked.
// The component uses the StatsInfo sub-component to display individual statistics and the CharAvatar component to display a character avatar if no profile picture is provided.

// Import necessary modules and components
import React from "react";
import CharAvatar from "./CharAvatar";

// Component to display individual stats information
const StatsInfo = ({ label, value }) => {
  return (
    <div className="text-center">
      <p className="font-medium text-gray-950">{value}</p>
      <p className="text-xs text-slate-700/80 mt-[2px]">{label}</p>
    </div>
  );
};

// Component to display user details card
const UserDetailsCard = ({
  profileImageUrl,
  fullname,
  username,
  totalPollsVotes,
  totalPollsCreated,
  totalPollsBookmarked,
}) => {
  return (
    <div className="bg-slate-100/50 rounded-lg mt-16 overflow-hidden">
      {/* Background image and profile picture */}
      <div className="w-full h-32 bg-profile-bg--img bg-cover flex justify-center bg-sky-500 relative">
        <div className="absolute -bottom-10 rounded-full overflow-hidden border-2 border-primary">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={fullname}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
        </div>
      </div>

      {/* User details and stats */}
      <div className="mt-12 px-5">
        <div className="text-center pt-1">
          <h5 className="text-lg text-gray-950 font-medium leading-6">
            {fullname}
          </h5>
          <span className="text-[13px] font-medium text-slate-700/60">
            @{username}
          </span>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap my-6">
          <StatsInfo label="Polls Created" value={totalPollsCreated || 0} />
          <StatsInfo label="Polls Voted" value={totalPollsVotes || 0} />
          <StatsInfo
            label="Polls Bookmarked"
            value={totalPollsBookmarked || 0}
          />
        </div>
      </div>
    </div>
  );
};

// Export the UserDetailsCard component
export default UserDetailsCard;
