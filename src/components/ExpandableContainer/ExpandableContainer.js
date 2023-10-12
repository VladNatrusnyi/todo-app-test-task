import styles from './ExpandableContainer.module.css'
import {useState} from "react"

export const ExpandableContainer = ({children, isShowControllers}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div
        style={{ maxHeight: isExpanded ? 'none' : '30px', overflow: 'hidden' }}>
        {children}
      </div>
      {
        isShowControllers &&
        <div>
          {isExpanded && (
            <div
              className={styles.showHideBtn}
              onClick={toggleExpansion}
            >
              hide all <i className="bi bi-caret-up"></i>
            </div>
          )}
          {!isExpanded && (
            <div
              className={styles.showHideBtn}
              onClick={toggleExpansion}
            >
              show all <i className="bi bi-caret-down"></i>
            </div>
          )}
        </div>
      }
    </>
  )
}
