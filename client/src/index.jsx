import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    console.log('getting');
    this.getRepos();
  }

  search(term) {
    console.log(`${term} was searched`);
    var app = this;

    $.ajax({
      method: 'POST',
      url: '/repos',
      data: JSON.stringify({ username: term }),
      contentType: 'application/json',
      success: function(data) {
        console.log('Post Success');
        app.getRepos.call(app);
      }
    });
  }

  getRepos() {
    var app = this;

    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json',
      success: function(data) {
        app.setState({ repos: data })
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={ this.state.repos }/>
      <Search onSearch={ this.search.bind(this) }/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));