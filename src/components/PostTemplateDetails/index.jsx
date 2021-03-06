import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import './style.scss';

import 'gitment/style/default.css'
import Gitment from 'gitment'

class PostTemplateDetails extends React.Component {
  componentDidMount(){
      let gitment = new Gitment({
          id: window.location.href,
          owner: 'CowKnife',
          repo: 'Cowknife.github.io',
          oauth: {
              client_id: '68832b9f7539b9d3a9ec',
              client_secret: 'b92700ed2a5d30b0956a69bfcd528f6fcb916dfd',
          },
      })
      gitment.render('container')
  }
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata;
    const post = this.props.data.markdownRemark;
    const tags = post.fields.tagSlugs;

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">All Articles</Link>
      </div>
    );

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags && tags.map((tag, i) =>
            <li className="post-single__tags-list-item" key={tag}>
              <Link to={tag} className="post-single__tags-list-item-link">
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          )}
        </ul>
      </div>
    );

    const commentsBlock = (
      <div>
        <Disqus postNode={post} />
      </div>
    );

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div className="post-single__body" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="post-single__date">
              <em>Published {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
            </div>
          </div>
          <div className="post-single__footer">
            {tagsBlock}
              <div id = "container"></div>
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
            {commentsBlock}
          </div>
        </div>
      </div>
    );
  }
}

PostTemplateDetails.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        subtitle: PropTypes.string.isRequired,
        author: PropTypes.object.isRequired
      })
    }),
    markdownRemark: PropTypes.object.isRequired
  })
};

export default PostTemplateDetails;
