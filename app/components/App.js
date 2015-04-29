var React = require('react');
var axios = require('axios');
var lodash = require('lodash');

var RecommendedBeer = require('./RecommendedBeer');

var App = React.createClass({
  getInitialState: function() {
    return {
      beers: [],
      selectedBeer: {},
      location: {},
      isLoading: true
    };
  },

  componentDidMount: function() {
    this.getLocation()
      .then((coords) => {
        return axios.get('/nearby', {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        })
      })
      .then((resp) => {
        this.setState({
          location: resp.data
        });
        return resp.data;
      })
      .then((store) => {
        axios.get('/stores/' + store.slug).then((resp) => {
          this.setState({
            beers: resp.data,
            selectedBeer: this.getRandomBeer(resp.data),
            isLoading: false
          });
        });
      });
  },

  getLocation: function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (loc) {
        resolve(loc.coords);
      });
    });
  },

  getRandomBeer: function (beers) {
    beers = beers || this.state.beers;
    return _.sample(beers);
  },

  handleNewRecommendation: function (e) {
    e.preventDefault();

    this.setState({
      selectedBeer: this.getRandomBeer()
    });
  },

  render: function() {
    return (
      <div className="container" style={styles.container}>
        <div className="row">
          <div className="col-sm-12 text-center">
            {this.state.isLoading ? (
              <p>Loading some fucking data...</p>
            ) : (
              <div>
                <h3>Why don't you try a fucking</h3>
                <RecommendedBeer beer={this.state.selectedBeer} />

                <button
                  style={styles.button}
                  className="btn btn-link btn-lg"
                  onClick={this.handleNewRecommendation}>
                  I don't fucking like this
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

});

var styles = {
  container: {
    marginTop: window.innerHeight * 0.2
  },
  button: {
    marginTop: 30
  }
};

module.exports = App;
