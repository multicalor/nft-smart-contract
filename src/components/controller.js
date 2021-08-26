import abi from './VoteABI.json'

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS)
    let address = await eth.getAccounts()
    await window.web3.currentProvider.enable();
    let res = null
    try{
        switch(payload.type) {
            case 'createToken':
                res = await contract.methods.createToken(payload.name, payload.symbol, payload.hash, payload.link).send({from: address[0]})
                break
            case 'getAllTokens':
                res = await contract.methods.getAllTokens().call()
                break
            case 'tokenByID': 
                res = await contract.methods.tokenByID(payload.id).call()
                break
            default:
                res = ""
                break    
        }
    } catch (e) {
        const error = e.message
       if(!error.includes('execution reverted: You are not')){
            throw error.charAt(0).toUpperCase() + error.slice(1)
        }
    }
    return res
}

export default contractFunc 