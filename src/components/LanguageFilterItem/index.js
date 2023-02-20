// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageItem, onToggleRepoClass} = props
  const {id, language} = languageItem

  const onClickCategory = () => {
    onToggleRepoClass(id)
  }

  return (
    <li className="repo-filter-item">
      <button className="repo-item-btn" type="button" onClick={onClickCategory}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
