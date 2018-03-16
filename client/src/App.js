import React from 'react';
import { Grid, Input, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import Tweets from './Tweets';

class App extends React.Component {
  state = { tweets: [], visible: [], tweet: '' }

  componentDidMount() {
    axios.get('/api/tweets')
      .then( res => this.setState({ tweets: res.data, visible: res.data }) )
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.updateVisible()
    });
  }

  updateVisible = () => {
    let { search, tweets } = this.state;
    if (search.length === 0)
      this.setState({ visible: tweets });
    else if (search.length > 3) {
      axios.get(`/api/search?term=${search}`)
        .then( res => this.setState({ visible: res.data }) )
    }
  }

  updateTweet = (e) => {
    this.setState({ tweet: e.target.value })
  }

  postTweet = () => {
    let { tweet, visible } = this.state;
    if (tweet) {
      axios.post('/api/tweet', { tweet })
        .then( res => this.setState({ tweet: '', visible: [...visible, res.data] }) )
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Header as="h3" textAlign="center">Tweet Something</Header>
            <Input onChange={this.updateTweet} value={this.state.tweet} />
            <Button onClick={this.postTweet}>Tweet!</Button>
            <Header as="h2" textAlign="center">Search</Header>
            <Input
              value={this.state.search}
              onChange={this.handleChange}
              icon={{ name: 'search', circular: true }}
              placeholder="Search..."
            />
          </Grid.Column>
          <Grid.Column mobile={10} tablet={10} computer={8}>
            <Tweets tweets={this.state.visible} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
