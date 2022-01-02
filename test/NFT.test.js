const NFT  = artifacts.require('./NFT')

import {tokens,EVM_REVERT} from './helpers'

require('chai')
    .use(require('chai-as-promised'))
    .should()

const delay = ms => new Promise(res => setTimeout(res, ms));

   
contract('nft',([deployer,receiver,exchange,user1,user2])=>{

    const name = "NFT Game";
    const symbol = "NFTG";


    let nft 

    beforeEach(async () => {
        nft = await NFT.new()
    })

    describe('deployment',()=>{

        it('track the name', async ()=>{

            const result = await nft.name()

            result.should.equal(name)

        })

        it('track the symbol', async ()=>{

            const result = await nft.symbol()

            result.should.equal(symbol)

        })
        


    })

    
})