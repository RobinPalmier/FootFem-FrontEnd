import React, { Component } from 'react';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';

class Article extends Component {
  constructor(props){
    super(props)
    this.state = {
      article : {title : "", message : "", image: ""}
    }
  }
  componentWillMount(){
    this.setState({
      article : this.props.location.aboutProps.article
    })
  }
  render() {
    return (
          <div className="content-article">
            <h1>{this.state.article.title}</h1>
            <div className="content-article-info">
              <img src={this.state.article.image} alt="img_article" />
              <p>
                {this.state.article.message}
              </p>
            </div>
          </div>
    )
  }
}

export default Article;
