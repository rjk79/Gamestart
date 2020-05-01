import React, { useState, useEffect } from "react";
import axios from 'axios'
import {CHAMPION_NAMES} from './Constants'
import './Dashboard.css'

function Dashboard() {
    const [responses, setResponses] = useState({})
    const [query, setQuery] = useState("")

    useEffect(() => {
    }, [])

    async function fetchData () {
        const res = await axios.get(`http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion/${query}.json`)
        if (res) {
            const {data} = res.data
            let copy = Object.assign({}, responses)
            copy[query] = data[query]
            setResponses(copy)
        }
    } 

    function handleExecuteQuery () {
        fetchData()
    }

    function handleChangeQuery (e) {
        let v = e.target.value.toLowerCase()
        if (v.length) v = v[0].toUpperCase() + v.slice(1)
        setQuery(v)
    }

    const champLis = Object.keys(responses).map(champ => {
        const stats = {}
        if (responses[champ]) {
            stats.name = responses[champ].id
            responses[champ].spells.forEach(s => {
                stats[s.name] = s.cooldown[0]
            })  
            
        } 

        const statsItems = Object.keys(stats).map((s, i) => (
            <div key={i}><strong>{s[0].toUpperCase() + s.slice(1)}: </strong>{stats[s]}</div>
        ))

        return (
            <div className="champli">{statsItems}</div>
        )
    })

    const championImg = CHAMPION_NAMES.includes(query) ? <img src={`http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${query}.png`} alt="None" /> : <div></div>
    // debugger
    return (
        <div className="dashboard">
            <input type="text" onChange={handleChangeQuery} value={query}/>
            <button onClick={handleExecuteQuery}>Search</button>
            {championImg}
            <div>
                {champLis}
            </div>
        </div>
    );
    
}

export default Dashboard;