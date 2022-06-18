import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi'

const CryptoDetails = () => {
    const { coinName } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");
    const {data, isFetching} = useGetCryptoDetailsQuery(coinName)

  return (
    <div>CryptoDetails</div>
  )
}

export default CryptoDetails
