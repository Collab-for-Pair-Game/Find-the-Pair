import React from "react";

const apiKey='5842332-aa1095e05cf4e449debbee440';
const apiUrl='https://pixabay.com/api/?key=';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pictures: []
    };
  }

  componentDidMount() {
    fetch(apiUrl+apiKey)
    // fetch('https://pixabay.com/api/?key=5842332-aa1095e05cf4e449debbee440')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pictures: result.hits,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, pictures } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {pictures.map(picture => (
            <li key={picture}>
              {picture.id}

              <img src={picture.previewURL} />
              
            </li>
          ))}
        </ul>
      );
    }
  }
}

export { MyComponent } ;