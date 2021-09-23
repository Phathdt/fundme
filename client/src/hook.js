import { useEffect, useState } from 'react'
import Web3 from 'web3'

export function useWeb3() {
  const [web3Instance, setWeb3Instance] = useState(null)

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)

        try {
          await window.ethereum.enable()

          setWeb3Instance(web3)
        } catch (error) {
          console.log(error)
        }
      } else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3
        console.log('Injected web3 detected.')
        setWeb3Instance(web3)
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          'http://127.0.0.1:8545'
        )
        const web3 = new Web3(provider)
        console.log('No web3 instance injected, using Local web3.')
        setWeb3Instance(web3)
      }
    }

    init()
  }, [])

  return web3Instance
}
