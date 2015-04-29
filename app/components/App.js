var React = require('react');
var axios = require('axios');
var _ = require('lodash');

var RecommendedBeer = require('./RecommendedBeer');

var App = React.createClass({
  getInitialState: function() {
    return {
      beers: [],
      sample: {},
      location: {},
      isLoading: true
    };
  },

  componentWillMount: function() {
    this.getRandomBeer = _.debounce(this.getRandomBeer, 200, {
      leading: true,
      trailing: false,
    });
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
            sample: this.getRandomBeer(resp.data),
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
      sample: this.getRandomBeer()
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
                <RecommendedBeer {...this.state.sample} />

                <div className="row">
                  <button
                    style={styles.button}
                    className="btn btn-link btn-lg text-danger"
                    onClick={this.handleNewRecommendation}>
                    I don't fucking like this
                  </button>

                  <button
                    style={styles.button}
                    className="btn btn-link btn-lg"
                    onClick={this.handleNewRecommendation}>
                    I already fucking had this
                  </button>
                </div>
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
