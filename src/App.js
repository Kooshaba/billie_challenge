import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './App.css';

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

class BillieText extends React.Component {
  addColors(text) {
    let output = [];
    let colorCounter = 0;
    const colors = [
      '#8093FF',
      '#FF502C',
      '#FF9472',
      '#FF91FF'
    ];

    for(let i = 0; i < text.length; i++) {
      if(text[i].match(/[\w!,.]/i)) {
        let color = colors[colorCounter % colors.length];
        let coloredLetter = <span key={i} style={{color}}>{text[i]}</span>;

        output.push(coloredLetter);
        colorCounter++;
      } else if (text[i].match(/\s/)) {
        output.push(<span key={i}>&nbsp;</span>);
      } else {
        output.push(text[i]);
      }
    }

    return output;
  }

  render() {
    return (
      <div className="BillieText">
        { this.addColors(this.props.text) }
      </div>
    );
  }
}

BillieText.propTypes = {
  text: PropTypes.string.isRequired
};

class DogPicture extends React.Component {
  render() {
    return (
      <div className='DogPicture'>
        <img
          className='DogPicture__img' width="500px"
          alt="Doggie"
          src={this.props.imgUrl}/>
        <span className='DogPicture__text-overlay'>
          <BillieText text='We ❤️ our pups!' />
        </span>
      </div>
    );
  }
}

DogPicture.propTypes = {
  imgUrl: PropTypes.string
};

class ReloadButton extends React.Component {
  render() {
    return (
      <button
        className={`ReloadButton ${this.props.loading ? 'ReloadButton--loading' : ''}`}
        disabled={this.props.loading}
        onClick={this.props.reload}>
        New Dog!
      </button>
    );
  }
}

ReloadButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: "",
      loading: false
    };
  }

  componentDidMount() {
    this.reloadImg();
  }

  reloadImg = async () => {
    try {
      this.setState({loading: true});

      const response = await axios.get(DOG_API_URL);
      const url = response.data.message;

      this.setState({ imgUrl: url, loading: false });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div className="App">
        <h2><BillieText text="Hire Andy Cernera, he is generally a good guy."/></h2>

        <ReloadButton loading={this.state.loading} reload={this.reloadImg}/>

        <DogPicture imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
export { BillieText };
