const Token  = artifacts.require('./Token')

import {tokens,EVM_REVERT} from './helpers'

require('chai')
    .use(require('chai-as-promised'))
    .should()
   
contract('Token',([deployer,receiver,exchange])=>{

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
})