import React from 'react'
import { connect } from 'react-redux'

class WsText extends React.Component {
    render() {
        return (
            <div>
                {this.props.text}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { text: state.text }
}

export default connect(mapStateToProps)(WsText)
