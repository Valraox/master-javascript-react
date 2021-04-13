import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
//import MensajeEstatico from "./MensajeEstatico";

class Peliculas extends Component {
    state = {};

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() * peliculas.length);
        peliculas[0].titulo = "Batman Begins";

        this.setState({
            peliculas: peliculas,
        });
    };

    favorita = (pelicula, indice) => {
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula,
        });
    };

    componentWillMount() {
        //console.log("Se va a montar el componente");
        this.setState({
            peliculas: [
                {
                    titulo: "Batman vs Superman",
                    image:
                        "https://i1.wp.com/www.vinilonegro.com/wp-content/uploads/2016/03/Batman-v-Superman-3-e1459165974655.jpg?fit=600%2C400&ssl=",
                },
                {
                    titulo: "Gran Torino",
                    image:
                        "https://static2.abc.es/Media/201504/18/clint7--644x362.jpg",
                },
                {
                    titulo: "Looper",
                    image:
                        "https://cdn.lanetaneta.com/wp-content/uploads/2019/07/Escopeta-de-trabuco-de-Looper-explicada-Screen-Rant-780x405.jpg",
                },
            ],
            nombre: "Álvaro García",
            favorita: {},
        });
    }

    componentDidMount() {
        //console.log("Se ha montado el componente");
    }

    componentWillUnmount() {
        //console.log("Me voy a desmontar");
    }

    render() {
        var pStyle = {
            background: "green",
            color: "white",
            padding: "10px",
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La película favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = <p>No hay película favorita</p>;
        }

        return (
            <React.Fragment>
                <Slider title="Películas" size="slider-small" />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de películas</h2>
                        <p>
                            Selección de las películas favoritas de{" "}
                            {this.state.nombre}
                        </p>
                        <p>
                            <button onClick={this.cambiarTitulo}>
                                Cambiar titulo de Batman
                            </button>
                        </p>

                        {/* {this.state.favorita.titulo ? (
          <p className="favorita" style={pStyle}>
            <strong>La película favorita es: </strong>
            <span>{this.state.favorita.titulo}</span>
          </p>
        ) : (
          <p>No hay película favorita</p>
        )} */}

                        {favorita}

                        {/* Crear componente pelicula */}

                        <div id="articles" className="peliculas">
                            {this.state.peliculas.map((pelicula, i) => {
                                return (
                                    <Pelicula
                                        key={i}
                                        pelicula={pelicula}
                                        indice={i}
                                        marcarFavorita={this.favorita}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}

export default Peliculas;
