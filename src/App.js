import React, { Component } from "react";
import "./App.css";
import MyNavbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Movies from "./components/Movies.jsx";
import MyFooter from "./components/Footer.jsx";
import MovieDetail from "./components/MovieDetail.jsx"; // Aggiunto MovieDetail

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedMovieId: null, // Nuovo stato per tenere traccia dell'ID del film selezionato
    };
  }

  handleSearch = (term) => {
    this.setState({ searchTerm: term, selectedMovieId: null });
  };

  handleMovieSelect = (movieId) => {
    this.setState({ selectedMovieId: movieId });
  };

  render() {
    const { searchTerm, selectedMovieId } = this.state;

    return (
      <>
        <MyNavbar onSearch={this.handleSearch} />
        <Header />
        {selectedMovieId ? (
          <MovieDetail movieId={selectedMovieId} onClose={() => this.handleMovieSelect(null)} />
        ) : (
          <>
            <Movies title={searchTerm} category="Searched" onMovieSelect={this.handleMovieSelect} />
            <Movies title="Star Wars" category="Most Popular" onMovieSelect={this.handleMovieSelect} />
            <Movies title="Harry Potter" category="Watch It Again" onMovieSelect={this.handleMovieSelect} />
            <Movies title="Goofy" category="Pippo" onMovieSelect={this.handleMovieSelect} />
            <Movies title="The Lord of The Rings" category="Best" onMovieSelect={this.handleMovieSelect} />
          </>
        )}
        <MyFooter />
      </>
    );
  }
}

export default App;