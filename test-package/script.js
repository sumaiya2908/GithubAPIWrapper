import GithubWrapper from 'get_repos';
import dotenv from 'dotenv'
dotenv.config(); 

let github = new GithubWrapper(process.env.USERNAME, process.env.ACCESSTOKEN)
let pinnedRepos = await github.getPinnedRepository(5)
pinnedRepos = pinnedRepos.pinnedItems.nodes

pinnedRepos.map((repo) => {
    console.log(repo)
})
