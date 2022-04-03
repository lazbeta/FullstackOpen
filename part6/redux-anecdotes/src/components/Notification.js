import { connect } from "react-redux"
import '../index.css'
//import { useSelector } from "react-redux"

const Notification = (props) => {

//const notification = useSelector(state => state.notification)

  return (
    <div id="notification">{props.notification}</div>
  )
}

const mapStateToProps = (state) => {
return {
  notification: state.notification
}
}

const ConnectedAnecdotes = connect(mapStateToProps)(Notification)
export default ConnectedAnecdotes