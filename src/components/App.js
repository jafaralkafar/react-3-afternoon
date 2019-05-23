import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

let baseUrl = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts`).then(response=>{
      // console.log('this: ', response)
      this.setState({posts: response.data})
    }).catch(err=>{
      console.log(err)
    })
  }

  updatePost=(id,text)=> {
    axios.put(`${baseUrl}/posts?id=${id}`, {text}).then(response=>{
      this.setState({posts:response.data})
    }).catch(err=>{
      console.log(err)
    })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${id}`).then(response=>{
      this.setState({posts:response.data})
    })
  }

  createPost(text) {
    axios.post(`${baseUrl}/posts`, {text}).then(response=>{
      this.setState({posts:response.data})
    })
  }

  // handlePost=()=> {
  //   let mapPost = this.state.posts(elem=>{
  //     return elem
  //   })
  // }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header id={posts.id}
                posts={posts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => (
              <Post key={post.id}
                    text={post.text}
                    date={post.date}
                    id={post.id}
                    updatePostFn={this.updatePost}
                    deletePostFn={this.deletePost} />
            ))
          }
          {/* <Post key={posts.id} handlePost={this.handlePost}/> */}
          
        </section>
      </div>
    );
  }
}

export default App;
