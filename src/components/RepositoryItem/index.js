// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {name, issuesCount, avatarUrl, forksCount, starsCount} = repoItem
  return (
    <li className="repo-item">
      <img className="repo-img" src={avatarUrl} alt={name} />
      <h2 className="repo-heading">{name}</h2>
      <div className="statistics-container">
        <div className="statistic-container">
          <img
            className="statistic-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="statistics-count">{starsCount} stars</p>
        </div>
        <div className="statistic-container">
          <img
            className="statistic-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="statistics-count">{forksCount} forks</p>
        </div>
        <div className="statistic-container">
          <img
            className="statistic-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="statistics-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
