import React, { useState } from "react";
import "./FindFriends.css";
import SearchBar from "./SearchBar";
import FriendBanner from "./FriendBanner";

export default function FindFriends() {
  const [userList, setUserList] = useState([]);
  return (
    <div className="find_friends_cont">
      <h1>Search Users</h1>
      <div className="search_bar">
        <SearchBar setUserList={setUserList}></SearchBar>
      </div>
      <div className="friend_banners">
        <ul>
          {userList.map((friend) => {
            return (
              <li>
                <FriendBanner friend={friend}></FriendBanner>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
