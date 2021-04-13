import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import "moment/locale/es";
import swal from "sweetalert";

import Global from "../Global";
import Sidebar from "./Sidebar";

class Article extends Component {
    url = Global.url;

    state = {
        article: false,
        status: null,
    };

    getArticle = () => {
        var id = this.props.match.params.id;

        axios
            .get(this.url + "article/" + id)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                    status: res.data.status,
                });
            })
            .catch((err) => {
                this.setState({
                    articles: false,
                    status: "success",
                });
            });
    };

    componentDidMount() {
        this.getArticle();
    }

    deleteArticle = (id) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado no podrás recuperar el artículo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url + "article/" + id).then((res) => {
                    this.setState({
                        article: res.data.article,
                        status: "deleted",
                    });

                    swal(
                        "Artículo borrado",
                        "El artículo ha sido borrado correctamente",
                        "success"
                    );
                });
            } else {
                swal("Borrado cancelado");
            }
        });
    };

    render() {
        if (this.state.status === "deleted") {
            return <Redirect to="/blog" />;
        }

        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">
                    {article && (
                        <article className="article-item article-detail">
                            {article.image !== null && (
                                <div className="image-wrap">
                                    <img
                                        src={
                                            this.url +
                                            "get-image/" +
                                            article.image
                                        }
                                        alt={article.title}
                                    />
                                </div>
                            )}

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>
                                    {article.date}
                                </Moment>
                            </span>
                            <p>{article.content}</p>

                            <button
                                onClick={() => {
                                    this.deleteArticle(article._id);
                                }}
                                className="btn btn-danger"
                            >
                                Eliminar
                            </button>
                            <Link to={"/blog/editar/" + article._id} className="btn btn-warning">
                                Editar
                            </Link>

                            <div className="clearfix"></div>
                        </article>
                    )}

                    {!this.state.article && this.state.status === "success" && (
                        <div id="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Inténtalo de nuevo más tarde</p>
                        </div>
                    )}

                    {this.state.status == null && (
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espere unos segundos</p>
                        </div>
                    )}
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default Article;
