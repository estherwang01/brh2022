import React, { useState, useEffect } from 'react';
import '../../App.css'
import Device from '../../components/Device/device';
import video from "../../files/duck.mp4";
import { getInt, isValidZipCode } from "../../util";
import left from "../../files/lefta.png";
import Icon from '../../components/icon/icon';

import beetle from "../../files/beetle.png";
import cheating from "../../files/cheating_beetle.png"
import co2 from "../../files/co2_oilrig.jpg";
import cow from "../../files/tipped_cow.png";
import methane from "../../files/methane_flamethrower.jpg";
import nitrogen from "../../files/nitrogen_natgas.jpg"
import rocket from "../../files/rocketship.png";
import Graph from '../../components/BarGraph/graph';

function Calculate() {

	const defaultVals = {
		"mode": "normal",
		"device_class": "laptop",
		"device_size": "large",
		"charges_per_day": 0.0
	}
	const [view, setView] = useState(0);
	const [zip, setZip] = useState(12345);
	const [data, setData] = useState([{
		"mode": "normal",
		"device_class": "laptop",
		"device_size": "large",
		"charges_per_day": 0.0
	}]);

	const [devices, setDevices] = useState(1);
	const [ret, setRet] = useState({});

	const sizes1 = ["large", "small"];
	const sizes2 = ["default size"]
  const [graph, setGraph] = useState(false); 

	useEffect(() => {
		const fetchData = async () => {
			const modified_data = { "zipcode": zip, "devices": data }
			await fetch("/compute_co2", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(modified_data)
			}).then(response => response.json()).then(dat => {
				setRet(dat);
			})
		}
		fetchData()
	}, [data, zip])

	const addDevice = () => {
		setDevices(devices + 1);
		setData([...data, defaultVals]);
	}

	const setZipcode = (n) => {
		if (isValidZipCode(n)) {
			let ni = getInt(n, 14853);
			setZip(ni);
		}
	}

	const setType = (index, value) => {
		let old = data[index]
		old["device_class"] = value;
		let newa = [...data]
		newa[index] = old
		setData(newa);
	}

	const setSize = (index, value) => {
		let old = data[index]
		old["device_size"] = value;
		let newa = [...data]
		newa[index] = old
		setData(newa);
	}

	const setCharges = (index, value) => {
		let old = data[index]
		old["charges_per_day"] = value;
		let newa = [...data]
		newa[index] = old
		setData(newa);
	}

	return (
		<div className="App">
			{view === 1 &&
				<img alt="" src={left} style={{
					position: "absolute", top: "-200px", left: "-210px", zIndex: '100', transform: 'scale(0.1)'
				}} onClick={() => setView(0)} />
			}
			<video autoPlay loop muted className='video'>
				<source src={video} type="video/mp4" />
			</video>
			<div className="cover"></div>
			{
				view === 0 ?
					<div className='content'>
						<div className="title">Your laptop and jetset mindset are killing the environment</div>
						<div style={{
							display: "flex",
							margin: "auto",
							width: "fit-content",
							verticalAlign: "middle",
							alignItems: "center"
						}}>
							<div className='title2'>Enter your zip code:</div>
							<input style={{ height: "fit-content" }} onChange={(e) => setZipcode(e.target.value)}></input>
						</div>
						<br></br>
						<button className='button' onClick={() => setView(1)}>aint no way</button>
					</div>
					:
					<div className='content' style={{display: "flex", justifyContent:"space-evenly"}}>
            <div style={{backgroundColor: "black", opacity:".8", height: "80vh"}}>
              <div className='title3'>Zipcode: {zip}</div>
              <div className='devicesContainer' >
                {[...Array(devices)].map((e, i) => <div className='device'>
                  <Device fields={["Device Type", "Size", "Charges Per Day"]}
                          onChangeFunctions={[(val) => setType(i, val), (val) => setSize(i, val), (val) => setCharges(i, val)]}
                          type={['dropdown', 'dropdown', 'input']}
                          dropdowns={data[i]["device_class"] === "laptop" ? [["laptop", "phone", "tablet"], sizes1, []] : [["laptop", "phone", "tablet"], sizes2, []]}
                  /></div>)}
              </div>
              <br></br>
              <button onClick={addDevice} className="button" style={{position: "absolute", bottom: "20px", transform: "translate(-50%, 0)"}}>Add device</button>
            </div>
						{/* <br></br>
						<br></br> */}
            { graph && 
              <div style={{zIndex: "500", backgroundColor: "white", borderColor: "black", borderWidth:"2px", borderStyle:"solid", width: "850px", height: "500px", position: "absolute", borderRadius:"5px 5px 5px 5px", padding:"10px"}}>
                <div className='title2' style={{color: "black"}}>Hey guess what you can WLOG away a lot of emissions by cheating ft. Volkswagon</div>
              <div style={{display: "flex"}}>
                <div style={{position: "relative", top: "40px", left: "75px"}}>
                  <img alt="" src={beetle} style={{width: "100px"}}/>
                  <div style={{height: "55px"}}></div>
                  <img alt="" src={cheating} style={{width: "100px"}}/>
                </div>
                <Graph values={[ret["miles_honest_volkswagen"], ret["miles_cheating_volkswagen"]]} 
                labels={[ "Honest", "Cheating",]} />
              </div>
              
                <button onClick={() => setGraph(false)} className='button2' style={{position: "absolute", bottom: "20px"}}>CLOSE</button>
              </div>
              }
            <div>


              <div className="subtitle">Your emissions from charging your devices are equivalent to:</div>
              <div style={{display: "flex", zIndex: "200", margin: "auto", width: "fit-content"}}>
                <Icon label="SpaceX Falcon 9 launches worth of CO2" value={ret["spacex_launches"]} img={rocket}/>
                <Icon label="years worth of methane from burps of an average cow" value={ret["annual_cow"]}
                      img={cow}/>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div style={{display: "flex", zIndex: "400", margin: "auto", width: "fit-content"}}>
                <Icon onClick={() => setGraph(true)} label="miles of driving in an emission-compliant Volkswagen" value={ret["miles_honest_volkswagen"]} img={beetle}/>
                <Icon onClick={() => setGraph(true)} label="miles of driving in a cheating Volkswagen" value={ret["miles_cheating_volkswagen"]} img={cheating}/>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div className="subtitle2">If you're a fucking nerd, here are the raw numbers on your emissions output:</div>
              <div style={{display: "flex", zIndex: "400", margin: "auto", width: "fit-content"}}>
                <Icon label="lbs of CO2" value={ret["carbondioxide"]} img={co2}/>
                <Icon label="lbs of methane" value={ret["methane"]} img={methane}/>
                <Icon label="lbs of nitrogen" value={ret["nitrogen"]} img={nitrogen}/>
              </div>
            </div>
					</div>
			}
		</div>
	);
}

export default Calculate;