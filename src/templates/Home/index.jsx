import { Component } from 'react'

import './styles.css'

import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-posts'
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'

export class Home extends Component {
  state = {
    posts: [], // stores some posts, not all
    allPosts: [], // stores all posts
    page: 0, // 1st index for slide operation, starts at 0 posts (a "page" is when n posts are loaded on the screen)
    postsPerPage: 5, // 2nd index for slice operation, loads n posts per "page" on the screen
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  componentDidUpdate() {
    console.log('PROP:', this.props)
    console.log('PROP value:', this.props['prop'])
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage,
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length


    // if searchValue ? filters by value : sends all 
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
      })
      : posts

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p className="not-found">No posts found.   =(</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              whenClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
        <Footer />
      </section>
    )
  }
}