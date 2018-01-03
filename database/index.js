const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  user: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => {
  // This function should save a repo or repos to
  // the MongoDB
  var entry = new Repo({
    id: repoData.id,
    name: repoData.name,
    user: repoData.owner.login,
    url: repoData.url,
    watchers: repoData.watchers
  });

  entry.save()
    .then(product => {
      console.log('Added to DB!'); })
    .catch(error => {
      console.error('Error adding entry: ', error); });
}

let get = (callback) => {
  Repo.find()
      .limit(25)
      .sort('-watchers')
      .exec(function(error, data) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, data);
        }
      });
}

module.exports.save = save;
module.exports.get = get;