import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List </h4>
    There are { repos.length } repos.
    { console.log(repos) }
    { repos.map((repo, index) => {
        return <Repo repo={ repo } key={ index }/>
      }) 
    }
  </div>
);

export default RepoList;