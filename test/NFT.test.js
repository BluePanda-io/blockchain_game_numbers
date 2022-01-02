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

    describe('NFT minting',()=>{

        describe('Success',() =>{

            let nftDirectory = 'sdf.txt'
            let nftDirectory3 = 'sdf3.txt'
            let nftDirectory2 = 'sdf2.txt'

            let result

            beforeEach(async () => {
                result =  await nft.mint(nftDirectory)
                result =  await nft.mint(nftDirectory3)

                result =  await nft.mint(nftDirectory2,{from: user1})
                
            })

            it('Check if the NFT balance of Users', async ()=>{

                result = await nft.balanceOf(deployer)
                result.toString().should.equal("2") // he have two nfts

                result = await nft.balanceOf(user1)
                result.toString().should.equal("1") // they have one nfts 


                result = await nft.balanceOf(user2)
                result.toString().should.equal("0") // He doesnt have any ntfs

            })

            it('Check what is the owner of the NFTs', async ()=>{

                result = await nft.ownerOf(1) // Take the address fo the owner
                result.toString().should.equal(deployer.toString()) 

                result = await nft.ownerOf(2) // Take the address fo the owner
                result.toString().should.equal(user1.toString()) 

            })

            it('Check what is the directory/name of the NFT', async ()=>{

                result = await nft.NFTs(0) // Take the address fo the owner
                result.toString().should.equal(nftDirectory.toString()) 

            })
            it('Check Total Supply ', async ()=>{

                result = await nft.totalSupply() // Take the address fo the owner
                result.toString().should.equal("3") 

            })
        })

        describe('Failure',() =>{

            let nftDirectory = 'sdf.txt'

            let result

            beforeEach(async () => {
                result =  await nft.mint(nftDirectory)
                
            })

            it('Check there is no owner for NTF 2 becuase its not minted yet', async ()=>{

                result = await nft.ownerOf(2).should.be.rejectedWith(EVM_REVERT) // Take the address fo the owner
                // result.toString().should.equal(user1.toString()) 

            })
        })
        


    })

    
})