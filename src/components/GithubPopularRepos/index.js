import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusCode = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAIL',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    languageSelected: languageFiltersData[0].id,
    apiStatus: apiStatusCode.initial,
  }

  componentDidMount = () => {
    this.setState({apiStatus: apiStatusCode.loading})
    this.getRepos()
  }

  getRepos = async () => {
    const {languageSelected} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageSelected}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok) {
      const modifiedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({reposList: modifiedData, apiStatus: apiStatusCode.success})
    } else {
      this.setState({apiStatus: apiStatusCode.failure})
    }
  }

  onToggleRepoClass = id => {
    this.setState(
      {languageSelected: id, apiStatus: apiStatusCode.loading},
      this.getRepos,
    )
  }

  renderLanguageFilterItems = () => (
    <>
      <h1>Popular</h1>
      <ul className="language-repos-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageItem={eachLanguage}
            key={eachLanguage.id}
            onToggleRepoClass={this.onToggleRepoClass}
          />
        ))}
      </ul>
    </>
  )

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repository-repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem repoItem={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResultRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCode.success:
        return this.renderSuccessView()
      case apiStatusCode.failure:
        return this.renderFailureView()

      case apiStatusCode.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.renderLanguageFilterItems()}
        {this.renderResultRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
