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
    if (details.city) {
      return `It's a fucking ${details.style} from ${details.city}.`
    } else {
      return `It's a fucking ${details.style}.`
    }
  },

  render: function() {
    return (
      <div className="recommended-beer">
        <span className="name">{this.props.name}</span>

        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <p className="lead">
              {this.state.isLoading ? 'Loading a fucking description' : (
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
