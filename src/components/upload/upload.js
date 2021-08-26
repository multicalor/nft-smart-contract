/* eslint-disable no-console */
'use strict'
const React = require('react')
const ipfsHttpClient = require('ipfs-http-client')


class IPFSLOAD extends React.Component {
    constructor () {
        super()
        this.state = {
            ipfs: ipfsHttpClient("https://ipfs.infura.io:5001/"),
            added_file_hash: null
        }

        // bind methods
        this.captureFile = this.captureFile.bind(this)
        this.saveToIpfs = this.saveToIpfs.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.multiaddr = React.createRef()
    }

    captureFile (event) {
        event.stopPropagation()
        event.preventDefault()
        this.saveToIpfs(event.target.files)

    }

    // Add file to IPFS and return a CID
    async saveToIpfs ([ file ]) {
        try {
            const added = await this.state.ipfs.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            console.log(added)
            this.setState({ added_file_hash: added.cid.toString() })
            this.props.hash(added.cid.toString())
            this.props.setFile(file)
        } catch (err) {
            console.error(err)
        }
    }


    handleSubmit (event) {
        event.preventDefault()
    }

    render () {
        if (this.state.ipfs) {
            return (
                <div>
                  <form id='capture-media' onSubmit={this.handleSubmit}>
                    <input type='file' name='input-file' id='input-file' onChange={this.captureFile} style={{marginTop: "25px"}}/><br/>
                  </form>
                </div>
            )
        }
    }
}
export default IPFSLOAD;