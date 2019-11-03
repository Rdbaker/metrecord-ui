import React from 'react';

const Home = ({
  hasAnyEvents,
  currentUser,
}) => {
  if (!hasAnyEvents) {
    return <div>you have no events yet!</div>
  }

  return <div>you have events!</div>
}

export default Home;