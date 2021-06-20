// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25 * 60, isClicked: true, reset: true}

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  showSeconds = () => {
    const {timer} = this.state
    const seconds = Math.floor(timer % 60)
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  showMinutes = () => {
    const {timer} = this.state
    const minutes = Math.floor(timer / 60)
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  onChangeTimerButtons = () => {
    const {isClicked} = this.state
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
      reset: false,
    }))
    if (isClicked === true) {
      this.timerID = setInterval(this.updateTimer, 1000)
    } else if (isClicked === false) {
      clearInterval(this.timerID)
    }
  }

  updateTimer = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
  }

  resetTimerValue = () => {
    const {reset} = this.state
    this.setState({timer: 25 * 60, isClicked: true, reset: true})
    clearInterval(this.timerID)
    if (reset) {
      this.decreaseTimer()
      this.increaseTimer()
    }
  }

  decreaseTimer = () => {
    const {reset} = this.state
    if (reset) {
      clearInterval(this.timerID)
      this.setState(prevState => ({
        timer: prevState.timer - 60,
        isClicked: true,
      }))
    }
  }

  increaseTimer = () => {
    const {reset} = this.state
    if (reset) {
      clearInterval(this.timerID)
      this.setState(prevState => ({
        timer: prevState.timer + 60,
        isClicked: true,
      }))
    }
  }

  render() {
    const {isClicked, timer} = this.state

    const displayPauseRunningText = isClicked ? 'Paused' : 'Running'
    const showStartPauseMsg = isClicked ? 'Start' : 'Pause'
    const showStartPauseImage = isClicked
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const altText = isClicked ? 'play icon' : 'pause icon'

    const showTimer = `${this.showMinutes()}:${this.showSeconds()}`

    const displayTimerValue =
      timer === 0 ? `${this.resetTimerValue()}` : showTimer

    return (
      <div className="bg-container">
        <h1 className="title">Digital Timer</h1>
        <div className="card-container">
          <div className="timer-image-container">
            <div className="timer-display">
              <h1 testid="timer" className="timer-text">
                {displayTimerValue}
              </h1>
              <p className="timer-description">{displayPauseRunningText}</p>
            </div>
          </div>

          <div className="timer-settings-container">
            <div className="adjust-timer-content">
              <div className="adjust-timer-button">
                <img
                  className="timer-icon"
                  src={showStartPauseImage}
                  alt={altText}
                />
                <button
                  type="button"
                  className="timer-content"
                  onClick={this.onChangeTimerButtons}
                >
                  {showStartPauseMsg}
                </button>
              </div>
              <div className="adjust-timer-button">
                <img
                  className="timer-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <button
                  type="button"
                  className="timer-content"
                  onClick={this.resetTimerValue}
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="display-text-content">Set Timer limit</p>
            <div className="buttons-container">
              <button
                onClick={this.decreaseTimer}
                type="button"
                className="button"
              >
                -
              </button>
              <p className="display-minutes-timer">{this.showMinutes()}</p>
              <button
                type="button"
                onClick={this.increaseTimer}
                className="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
