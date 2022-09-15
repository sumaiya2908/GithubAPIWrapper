import fetch from "node-fetch";

class GithubWrapper {
  constructor(userName, accessToken) {
    this.userName = userName;
    this.accessToken = accessToken
    this.headers = { 'Authorization': `Bearer ${accessToken}` }
  }

  async getPinnedRepository(number) {
    let userName = this.userName
    var query = `query($userName: String!, $number: Int) {
        user(login: $userName) { 
          pinnedItems(first: $number, types: REPOSITORY) {
            nodes {
              ... on RepositoryInfo {
                name
                description
                url
                createdAt
                updatedAt
              }
            }
          }
        }
      }`

    let body = JSON.stringify({ query, variables: { userName, number } })
    try {
      let repos = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        body,
        headers: this.headers
      });
      repos = await repos.json();
      return repos.data.user
    }

    catch (err) {
      return err
    }
  }
}

export default GithubWrapper