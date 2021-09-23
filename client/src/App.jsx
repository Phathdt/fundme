import { useEffect, useState } from 'react'
import FundForm from './components/FundForm'
import CheckFund from './components/CheckFund'
import Result from './components/Result'
import { useWeb3 } from './hook.js'
import FundMeContract from './contracts/FundMe.json'

function App() {
  const [account, setAccount] = useState([])
  const [contract, setContract] = useState(null)
  const [total, setTotal] = useState(0)
  const [valueDonate, setValueDonate] = useState(0)
  const web3 = useWeb3()

  useEffect(() => {
    async function init() {
      const accounts = await web3.eth.getAccounts()

      const networkId = await web3.eth.net.getId()
      const deployedNetwork = FundMeContract.networks[networkId]
      const instance = new web3.eth.Contract(
        FundMeContract.abi,
        deployedNetwork && deployedNetwork.address
      )

      setAccount(accounts[0])
      setContract(instance)
    }

    web3 && init()
  }, [web3])

  async function getTotal() {
    const response = await contract.methods.getTotal().call()

    setTotal(response)
  }

  useEffect(() => {
    if (web3 && contract) {
      getTotal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, contract])

  async function fund(amount) {
    await contract.methods
      .fund()
      .send({ from: account, value: web3.utils.toWei(`${amount}`, 'ether') })

    await getTotal()
  }

  async function check(address) {
    const response = await contract.methods
      .addressToAmountFunded(address)
      .call()

    setValueDonate(response)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="display-2 font-weight-bolder mb-4 text-center">
            Total: {total / 10 ** 18} ETH
          </h1>
        </div>

        <div className="row">
          <div className="col">
            <FundForm fund={fund} />
          </div>
          <div className="col">
            <CheckFund check={check} valueDonate={valueDonate} />
            <Result valueDonate={valueDonate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
