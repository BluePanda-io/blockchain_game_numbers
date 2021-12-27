const Token  = artifacts.require('./Token')

import {tokens,EVM_REVERT} from './helpers'

require('chai')
    .use(require('chai-as-promised'))
    .should()

const delay = ms => new Promise(res => setTimeout(res, ms));

   
contract('Token',([deployer,receiver,exchange,user1,user2])=>{

    const name = "My Name";
    const symbol = "TR";


    const decimals = '18';
    const totalSupply = tokens(1000000).toString();

    let token 

    beforeEach(async () => {
        token = await Token.new()
    })

    describe('deployment',()=>{

        it('track the name', async ()=>{

            const result = await token.name()

            result.should.equal(name)

        })

        it('track the symbol', async ()=>{

            const result = await token.symbol()

            result.should.equal(symbol)

        })
        it('track the decimals', async ()=>{
            const result = await token.decimals()
            result.toString().should.equal(decimals)
        })
        it('track the total Supply', async ()=>{
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply)
        })

        it('assigns the total supply to the deployer', async ()=>{
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply)
        })

        it('check game address', async ()=>{
            const result = await token.gameAddress()
            // console.log("result = ",result.toString())
            result.toString().should.equal(deployer.toString())
        })


    })

    describe('Sent Tokens',() =>{

        describe('Success',() =>{

            let amount = tokens(10)
            let result

            beforeEach(async () => {
                result =  await token.transfer(receiver,amount,{from: deployer})

            })

            it('transfer function works ', async ()=>{

                let balanceOf = await token.balanceOf(receiver,{from:deployer})
                balanceOf.toString().should.equal(amount.toString())

                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokens(999990).toString())
            })

            it('emit a transfer event ', async ()=>{

                const log = result.logs[0]
                log.event.should.eq('Transfer')

                const event = log.args
                event.from.toString().should.equal(deployer,'from is correct')
                event.to.toString().should.equal(receiver,'to is correct')
                event.value.toString().should.equal(amount.toString(),'value is correct')
            })
        })

        describe('failure', async () => {

            it('rejects insufficient balances', async () => {
              let invalidAmount
              invalidAmount = tokens(100000000) // 100 million - greater than total supply
              await token.transfer(receiver, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)



              await token.transfer(receiver,tokens(10),{from: deployer})
              invalidAmount = tokens(12) // 100 million - greater than total supply
              await token.transfer(deployer, invalidAmount, { from: receiver }).should.be.rejectedWith(EVM_REVERT)
      
            })
      
            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, tokens(10), { from: deployer }).should.be.rejected
              })
      
          })
    })

    describe('approving tokens',()=>{
        describe('Success',() =>{

            let result
            let amount

            beforeEach(async() => {
                amount = tokens(100)
                result = await token.approve(exchange,amount,{from: deployer})
            })

           it('alloates an allowance for delagated token spending',async() =>{
               const allowance = await token.allowance(deployer,exchange)
               allowance.toString().should.equal(amount.toString())
           })

           it('emit a approval event ', async ()=>{

            const log = result.logs[0]
            log.event.should.eq('Approve')

            const event = log.args
            event.owner.toString().should.equal(deployer,'from is correct')
            event.spender.toString().should.equal(exchange,'to is correct')
            event.value.toString().should.equal(amount.toString(),'value is correct')
        })
        })

        describe('failure', async () => {

      
            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, tokens(10), { from: deployer }).should.be.rejected
              })
      
          })
    })


    describe('Sent Tokens from aproved user',() =>{

        let amount
        let result

        beforeEach(async () => {
            amount = tokens(10)

            result = await token.approve(exchange,amount,{from: deployer}) // The echange can spent money for behalf of teh deployer

        })

        describe('Success',() =>{

            

            beforeEach(async () => {
                result =  await token.transferFrom(deployer,receiver,amount,{from: exchange}) // The exchange is spending money from the deployer to the receiver

            })

            it('transferFrom function works ', async ()=>{

                let balanceOf = await token.balanceOf(receiver,{from: deployer})
                balanceOf.toString().should.equal(amount.toString())

                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokens(999990).toString())
            })

            it('emit a transfer event ', async ()=>{

                const log = result.logs[0]
                log.event.should.eq('Transfer')

                const event = log.args
                event.from.toString().should.equal(deployer,'from is correct')
                event.to.toString().should.equal(receiver,'to is correct')
                event.value.toString().should.equal(amount.toString(),'value is correct')
            })
        })

        describe('failure', async () => {

            it('rejects insufficient balances', async () => {
              let invalidAmount
              invalidAmount = tokens(100000000) // 100 million - greater than total supply
              await token.transferFrom(deployer,receiver, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)



              await token.approve(exchange,amount,{from: deployer}) // The echange can spent money for behalf of teh deployer
              await token.transferFrom(deployer,receiver,tokens(10),{from: exchange})
              invalidAmount = tokens(12) // 100 million - greater than total supply
              await token.transferFrom(deployer,receiver, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)
      
            })

            it('have aproved balance but not enought cash in the acount to sent it  ', async () => {
  
                await token.transfer(user1,tokens(50),{from: deployer})
  
                await token.approve(user2,tokens(200),{from: user1}) // The user2 can spent money for behalf of the user1
                await token.transferFrom(user1,receiver,tokens(70),{from: user2}).should.be.rejectedWith(EVM_REVERT)
                // invalidAmount = tokens(12) // 100 million - greater than total supply
                // await token.transferFrom(deployer,receiver, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)
        
              })
      
            it('rejects invalid recipients', async () => {
                await token.transferFrom(0x0, tokens(10), { from: deployer }).should.be.rejected
              })
      
        //   })
        })
    })


    describe('Game Tokens Contracts',() =>{

        describe('Allow Tokens to Play',() =>{

            let amount
            let result

            // it('check timeStampLastPlay', async ()=>{
            //     // const result = await token.balanceOf(deployer)
            //     // result.toString().should.equal(totalSupply)
            //     let result = await token.timeStampLastPlay(user1)
            //     console.log("timeStampLastPlay = ",result.toString())

            //     result = await token.allowance(deployer,user1) // were you spent who spent it 
            //     console.log("allowance = ",result.toString())


            //     await token.allowedTokensToPlay({from: user1})


            //     result = await token.timeStampLastPlay(user1)
            //     console.log("timeStampLastPlay = ",result.toString())


            //     result = await token.allowance(deployer,user1) // were you spent who spent it 
            //     console.log("allowance = ",result.toString())


            //     await delay(32000)

            //     console.log("Deplay for X seconcds = ")
                


            //     await token.allowedTokensToPlay({from: user1})


            //     result = await token.timeStampLastPlay(user1)
            //     console.log("timeStampLastPlay = ",result.toString())


            //     result = await token.allowance(deployer,user1) // were you spent who spent it 
            //     console.log("allowance = ",result.toString())

            // })

            it('Get Coins from your available ones ', async ()=>{
                // const result = await token.balanceOf(deployer)
                // result.toString().should.equal(totalSupply)
                let result = await token.timeStampLastPlay(user1)
                console.log("timeStampLastPlay = ",result.toString())

                result = await token.allowance(deployer,user1) // were you spent who spent it 
                console.log("allowance = ",result.toString())


                await token.allowedTokensToPlay({from: user1})


                result = await token.timeStampLastPlay(user1)
                console.log("timeStampLastPlay = ",result.toString())


                result = await token.allowance(deployer,user1) // were you spent who spent it 
                console.log("allowance = ",result.toString())

                result = await token.balanceOf(user1)
                console.log("balanceOf = ",result.toString())



                await token.transferFrom(deployer,user1,10,{from: user1}) // The exchange is spending money from the deployer to the receiver


                result = await token.allowance(deployer,user1) // were you spent who spent it 
                console.log("allowance After transferFrom= ",result.toString())

                result = await token.balanceOf(user1)
                console.log("balanceOf After transferFrom= ",result.toString())


            })

            // beforeEach(async () => {
            //     amount = tokens(10)

            //     result = await token.approve(exchange,amount,{from: deployer}) // The echange can spent money for behalf of teh deployer

            // })

            // describe('Success',() =>{

                

            //     beforeEach(async () => {
            //         result =  await token.transferFrom(deployer,receiver,amount,{from: exchange}) // The exchange is spending money from the deployer to the receiver

            //     })

            
            // })

            // describe('failure', async () => {

                
            // })
        })
    })
})