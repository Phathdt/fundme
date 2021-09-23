export default function Result({ valueDonate }) {
  return (
    <div className="container">
      <h5 className="text-right">{valueDonate / 10 ** 18} ETH</h5>
    </div>
  )
}
