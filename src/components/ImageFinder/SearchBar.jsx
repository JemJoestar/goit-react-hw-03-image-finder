import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    currentRequest: '',
  };
  handleChange = event => {
    this.setState({ currentRequest: event.currentTarget.value });
  };

  render() {
    return (
      <header className="searchbar">
        <form
          className="form"
          onSubmit={event => {
            this.props.onSubmit({
              event,
              searchReq: this.state.currentRequest,
            });
            this.setState({currentRequest: ""});
          }}
        >
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.currentRequest}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
