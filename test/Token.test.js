const Token  = artifacts.require('./Token')

import {tokens} from './helpers'

require('chai')
    .use(require('chai-as-promised'))
    .should()
   
contract('Token',([deployer,receiver])=>{

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
        it('transfer function works ', async ()=>{
            await token.transfer(receiver,tokens(10))

            let result = await token.balanceOf(receiver,{from:deployer})
            result.toString().should.equal(tokens(10).toString())

            result = await token.balanceOf(deployer)
            result.toString().should.equal(tokens(999990).toString())
        })
    })
})