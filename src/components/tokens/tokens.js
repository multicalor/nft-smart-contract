import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useClasses from './clasess';
import contractFunc from "../controller";

const getInfo = async (eth, id) => {
    try {
        const resp = await contractFunc(eth, {type: 'tokenByID', id});
        console.log("respGet", resp)
        window.open(`https://goerli.etherscan.io/token/${resp}`, "_blank")
    } catch (e){
        console.log(e)
    }
};

const Tokens = ({tokens, eth}) => {
  const classes = useClasses();
  return <Container className={classes.root}>
        <Grid container spacing={3} key='content'>
          <Grid item xs={12} key='header'>
            <Paper
                elevation={0}
                className='paper header'>
                List of NFT
            </Paper>
          </Grid>
          { tokens && tokens.length ?
              tokens.map(item =>  {
                return <Grid item xs={4} key={item[0]}>
                  <Paper
                      elevation={3}
                      className={classes.paper}
                  >
                    <a href={item.IPFSLink} target="_blank"><img className={classes.img} src={item.IPFSLink} /></a>
                    <div className={classes.caption}>

                      <Typography className={classes.title}>Contract: {item.name}</Typography>
                      <Typography className={classes.title} onClick={() => {getInfo(eth, item.tokenId)}}>Token: <a href="#">Link</a></Typography>
                    </div>

                  </Paper>
                </Grid>
              }) :
              <Grid item xs={12} key='noPaper'>
                <Paper
                    elevation={0}
                    className='paper'>
                  <div className="caption">
                        <Typography className="title">You haven't made NFT Token</Typography>
                        <Typography className="description">You can create a new NFT</Typography>
                  </div>
                </Paper>
              </Grid>
          }
        </Grid>
      </Container>

}

export default Tokens;