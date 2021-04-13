import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Pelicula extends Component {
  marcar = () => {
    this.props.marcarFavorita(this.props.pelicula, this.props.indice);
  };

  render() {
    const { titulo, image } = this.props.pelicula;

    return (
      <article class="article-item" id="article-template">
        <div class="image-wrap">
          <img src={image} alt={titulo} />
        </div>

        <h2>{titulo}</h2>
        <span className="date">Hace 5 minutos</span>
        <Link to={'/blog'}>Leer más</Link>
        <button onClick={this.marcar}>Marcar como favorita</button>

        <div class="clearfix"></div>
      </article>
    );
  }
}

export default Pelicula;
