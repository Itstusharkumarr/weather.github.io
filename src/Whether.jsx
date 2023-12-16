import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Whether() {
    const [data, setData] = useState({
        celcius: "",
        name: "",
        humidity: "",
        speed: "",
        image:"/img/cloud.png"
    })

    const [name, setName] = useState('')

    useEffect(() => {



    }, [])

    function handleclick() {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=3edfa857d02a39ec7a750f01fb55fcaa`)
        
            .then(res => {
                let img = '';
                if(res.data.weather[0].main =='Clouds')
                {
                    img = '/img/cloud.png'
                }else if(res.data.weather[0].main =='Clear')
                {
                    img = '/img/clearr.png'
                }else if(res.data.weather[0].main =='Rain')
                {
                    img = '/img/rain.png'
                }else{
                    img = '/img/cloud.png'
                }
                console.log(res.data)
                setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed,image:img})

               
            })
            .catch(err => (console.log(err)))

    }

    return (
        <>
            <div className='container '>
                <div className='weather'>
                    <div className='search'>
                        <input type='text' placeholder='Enter city name' onChange={(e) => setName(e.target.value)} />
                        <button onClick={handleclick}><i class="fa-solid fa-magnifying-glass" style={{ color: "#2475cc;" }}></i></button>
                    </div>

                    <div className='wininfo'>
                        <img src={data.image} height={'200px'} width={'200px'} className='icon' />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        <h2>{data.name}</h2>
                        <div className='detail'>
                            <div className='col'>
                                <img src='/img/humidity.png' />
                                <div className='text'>
                                    <p className='top'>{Math.round(data.humidity)}%</p>
                                    <p className='top'>Humidity</p>
                                </div>
                            </div>
                            <div className='col'>
                                <img src='/img/wind.png' />
                                <div className='text'>
                                    <p className='top'>{Math.round(data.speed)}km/h</p>
                                    <p className='top'>Wind</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
