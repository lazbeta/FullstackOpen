import { connect } from "react-redux"
//import { useSelector } from "react-redux"

const Notification = (props) => {

//const notification = useSelector(state => state.notification)

  console.log(props.notification, 'notificattion')
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
return {
  notification: state.notification
}
}

const ConnectedAnecdotes = connect(mapStateToProps)(Notification)
export default ConnectedAnecdotes