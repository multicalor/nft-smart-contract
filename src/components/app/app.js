import React, {useEffect, useState} from 'react'
import Web3 from 'web3'

import Header from "../header/header";
import contractFunc from '../controller'
import useClasses from './classes'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'


import Form from "../form/form";
import Tokens from "../tokens/tokens";

const App = () => {
    const classes = useClasses();
    const [eth, setEth] = useState();
    const [tokens, setTokens] = useState();
    const [transaction, setTransaction] = useState();
    const [id, setId] = useState();

    const [open, setOpen] = React.useState(false);

    const styles = {
        createButton: {
            position: 'fixed',
            padding: '10px 15px',
            right: '3%',
            bottom: '3%',
            backgroundColor: '#ff2975bb',
            color: '#fff',
            borderRadius: 50,
            minHeight: 45,
            minWidth: 120,
            fontSize: 12,
            '&:hover': {
                transition: 'margin-left 2s ease',
                backgroundColor: '#ff295fdd',
            },

        },
        refreshButton: {
            position: 'fixed',
            padding: '10px 15px',
            right: '2%',
            bottom: '10%',
            backgroundColor: '#4051b5',
            color: '#fff',
            borderRadius: 50,
            minHeight: 45,
            minWidth: 120,
            fontSize: 12,
            '&:hover': {
                transition: 'margin-left 2s ease',
                backgroundColor: '#ff295fdd',
            },

        },
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ethLogin = async () => {
        await window.web3.currentProvider.enable();
        const newWeb = new Web3(Web3.givenProvider);
        setEth(newWeb.eth);
        await showTokens(newWeb.eth);

    };

    const showTokens = async (localEth) => {
        try {
            const resp = await contractFunc(localEth, {type:"getAllTokens"});
            console.log("resp", resp);
            setTokens(resp);

        } catch(e) {
            console.log(e)
        }
    };

    const refreshTokens = async (localEth) => {
        try {
            const resp = await contractFunc(localEth, {type:"getAllTokens"});
            console.log("eth", eth);
            setTokens(resp);

        } catch(e) {
            console.log(e)
        }
    };

    return (

        <Container className={classes.body}>
            <Header open={open} close={() => setOpen(false)} eth={eth}/>
            <Button  onClick={handleClickOpen} style={styles.createButton}>
                Create NFT
            </Button>
            <Form open={open} close={() => setOpen(false)} eth={eth}/>

            {eth ?
                <div className="buttons">
                    {transaction ? 
                        <div>
                            <button onClick={()=> window.open(`https://goerli.etherscan.io/tx/${transaction}`, "_blank")}>Show transaction</button>
                        </div>:
                        <></>
                    }
                    <div>
                        <Button onClick={()=>{refreshTokens(eth)}} style={styles.refreshButton}>Refresh tokens</Button>
                    </div>
                    <Tokens tokens={tokens} eth={eth}/>
                </div>: 
                <Button onClick={ethLogin} variant="contained" color="primary">Connect metamask</Button>
            }
        </Container>
    )
};

export default App