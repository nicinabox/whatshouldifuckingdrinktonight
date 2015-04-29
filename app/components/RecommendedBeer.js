var React = require('react');
var axios = require('axios');

var RecommendedBeer = React.createClass({
  getInitialState: function() {
    return {
      details: '',
      isLoading: true
    };
  },

  componentWillMount: function() {
    this.fetchDetails(this.props.id);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      details: '',
      isLoading: true
    });

    this.fetchDetails(nextProps.id);
  },

  fetchDetails: function (id) {
    axios.get('/beers/' + id).then((resp) => {
      this.setState({
        details: resp.data,
        isLoading: false
      });
    });
  },

  description: function () {
    var details = this.state.details;
    var sentence = "It's ";

    if (details.style) {
      sentence += ` a fucking ${details.style}`;
    }

    if (details.city) {
      sentence += ` from ${details.city}`
    }

    if (!details.style && !details.city) {
      sentence = 'No fucking idea.';
    };

    return sentence;
  },

  render: function() {
    return (
      <div id="recommended-beer">
        <span className="name">{this.props.name}</span>

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <p className="lead">
              {this.state.isLoading ? 'Hold on a fucking second...' : (
                this.description()
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = RecommendedBeer;
