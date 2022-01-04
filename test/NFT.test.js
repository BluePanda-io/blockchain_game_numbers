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

    describe('NFT Enumarate Test',()=>{

        describe('Success',() =>{

            let nftDirectory = 'sdf.txt'
            let nftDirectory3 = 'sdf3.txt'
            let nftDirectory2 = 'sdf2.txt'
            let nftDirectory4 = 'sdf4.txt'

            let result

            beforeEach(async () => {
                result =  await nft.mint(nftDirectory)
                result =  await nft.mint(nftDirectory3)

                result =  await nft.mint(nftDirectory2,{from: user1})
                result =  await nft.mint(nftDirectory4)

                
            })

            it('Check the nfts of a user saved on the file', async ()=>{

                result = await nft.tokenOfOwnerByIndex(deployer,0)
                // console.log("tokenOfOwnerByIndex =",result.toString())
                result.toString().should.equal("0") // he have two nfts

                result = await nft.tokenOfOwnerByIndex(deployer,1)
                result.toString().should.equal("1") // he have two nfts

                result = await nft.tokenOfOwnerByIndex(deployer,2)
                result.toString().should.equal("3") // he have two nfts

            })

            it('Check the nfts of a user saved on the file and what is the file', async ()=>{

                result = await nft.tokenOfOwnerByIndexDirectory(deployer,0)
                // console.log("tokenOfOwnerByIndex =",result.toString())
                result.toString().should.equal(nftDirectory) // he have two nfts

                result = await nft.tokenOfOwnerByIndexDirectory(deployer,1)
                result.toString().should.equal(nftDirectory3) // he have two nfts

                result = await nft.tokenOfOwnerByIndexDirectory(deployer,2)
                result.toString().should.equal(nftDirectory4) // he have two nfts

            })

            it('Check all the token indexing', async ()=>{

                const numberNFTs = await nft.balanceOf(deployer)
                

                for (let i=0;i<numberNFTs-1;i++){
                    result = await nft.tokenByIndex(i)
                    result.toString().should.equal(i.toString())
                }

                // result = await nft.tokenByIndex(0)
                // result.toString().should.equal("0") // he have two nfts

                // result = await nft.tokenByIndex(1)
                // result.toString().should.equal("1") // he have two nfts

                // result = await nft.tokenByIndex(2)
                // result.toString().should.equal("2") // he have two nfts

            })

            
        })
    })

    describe('NFT Transfer',()=>{

        describe('Success',() =>{

            let nftDirectory = 'sdf.txt'
            let nftDirectory3 = 'sdf3.txt'
            let nftDirectory2 = 'sdf2.txt'
            let nftDirectory4 = 'sdf4.txt'

            let result

            beforeEach(async () => {
                result =  await nft.mint(nftDirectory)
                result =  await nft.mint(nftDirectory3)

                
            })

            it('Check the transfer of nft from deployer to user1', async ()=>{

                result = await nft.ownerOf(0) // Take the address fo the owner
                result.toString().should.equal(deployer.toString()) 
                
                result = await nft.transferFrom(deployer,user1,0)
                
                result = await nft.ownerOf(0) // Take the address fo the owner
                // console.log("ownerOf = ",result.toString(),user1.toString())
                result.toString().should.equal(user1.toString()) 

            })
            


            

            
        })
    })

    describe('NFT complicated transfer',()=>{

        describe('Success',() =>{

            let nftDirectory = 'sdf.txt'
            let nftDirectory2 = 'sdf2.txt'
            let nftDirectory3 = 'sdf3.txt'
            let nftDirectory4 = 'sdf4.txt'
            let nftDirectory5 = 'sdf5.txt'
            let nftDirectory6 = 'sdf6.txt'
            let nftDirectory7 = 'sdf7.txt'

            let result

            beforeEach(async () => {
                result =  await nft.mint(nftDirectory5,{from: user1})
                result =  await nft.mint(nftDirectory6,{from: user1})
                result =  await nft.mint(nftDirectory)
                result =  await nft.mint(nftDirectory2)
                result =  await nft.mint(nftDirectory3)
                
                
            })

            it('Check the transfer of nft from deployer to user1', async ()=>{

                let numberNFTs = await nft.balanceOfAllTokensMintToAddress(deployer)
                

                for (let i=0;i<numberNFTs;i++){
                    result = await nft.tokenOfOwnerByIndexDirectory(deployer,i)
                    console.log("tokenOfOwnerByIndexDirectory = ",result.toString())
                    // result.toString().should.equal(result.toString())
                }

                let tokenID = await nft.tokenOfOwnerByIndex(deployer,1)
                console.log("tokenID of the (1) index of deployer = ",tokenID.toString())


                let addressOwner = await nft._tokenOwner(tokenID)
                console.log("tokenID of the (1) index of deployer = ",addressOwner.toString())
                addressOwner.toString().should.equal(deployer.toString()) 



                result = await nft.transferFrom(deployer,user1,tokenID)

                addressOwner = await nft._tokenOwner(tokenID)
                console.log("tokenID of the (1) index of deployer = ",addressOwner.toString())
                addressOwner.toString().should.equal(user1.toString()) 

                
                numberNFTs = await nft.balanceOfAllTokensMintToAddress(deployer)

                for (let i=0;i<numberNFTs;i++){
                    result = await nft.tokenOfOwnerByIndexDirectory(deployer,i)
                    console.log("tokenOfOwnerByIndexDirectory = ",result.toString())
                    // result.toString().should.equal(result.toString())
                }

            })
            


            

            
        })
    })

    
})