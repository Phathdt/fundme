import FundForm from './components/FundForm'
import CheckFund from './components/CheckFund'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="display-2 font-weight-bolder mb-4 text-center">
            FundMe
          </h1>
        </div>

        <div className="row">
          <div className="col">
            <FundForm />
          </div>
          <div className="col">
            <CheckFund />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
