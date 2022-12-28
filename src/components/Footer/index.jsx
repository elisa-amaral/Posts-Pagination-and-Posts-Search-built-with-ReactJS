import './styles.css'

import { Component } from "react"

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <p>Built with <span className="heart-entity">&#10084;</span> by <a href="https://beacons.ai/elisa_amaral"
                    target="_blank" rel="noreferrer">Elisa Amaral</a></p>
            </footer>
        )
    }
}