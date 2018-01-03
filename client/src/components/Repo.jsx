import React from 'react';

const Repo = ({ repo }) => (
  <div>
    <span> { repo.user } </span>
    <a href={ repo.url }> { repo.name } </a>
  </div>
);

export default Repo;