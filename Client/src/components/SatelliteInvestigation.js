import React, { useState, useEffect } from "react";
import Map from "./Map";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SatelliteInvestigation = () => {
  const [start0, setStart0] = useState();
  const [start1, setStart1] = useState();
  const [end0, setEnd0] = useState();
  const [end1, setEnd1] = useState();
  const [range, setRange] = useState();

  const uid = sessionStorage.getItem("userid");
  const [userData, setUserData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchData = async ()=>{
  //     await axios
  //       .get(`http://localhost:8000/user-details/${uid}`)
  //       .then(userdata=>{
  //         setUserData(userdata.data)
  //         setLoaded(true)
  //       })

  //       .catch((er) => {
  //         console.log(er);
  //       });
  //   }

  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roadcoord = new FormData();
    roadcoord.append("start0", e.target.start0.value);
    roadcoord.append("start1", e.target.start1.value);
    roadcoord.append("end0", e.target.end0.value);
    roadcoord.append("end1", e.target.end1.value);
    roadcoord.append("range", e.target.range.value);
    // roadcoor.append(e.)
    // console.log(e.target.start0.value)

    const Data = new Object();
    Data.user = uid;
    Data.name = "name1";
    Data.district = "district1";
    Data.state = "State1";

    try {
      toast.info("Running Model!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      await axios
        .post("http://localhost:8080/satellite/", roadcoord)
        .then((result) => {
          console.log(result);
          const obj = JSON.parse(result.data);
          // formData.append('distress',obj);
          Data.distress = obj;

          console.log(obj);
          toast.success("Model Performed!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(Data);
      await axios.post("http://localhost:8000/road/store", Data).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Map></Map>
      <br />
      <br />
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Start Latitude
              </label>
              <input
                name="start0"
                required
                onChange={(e) => {
                  setStart0(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Start Longitude
              </label>
              <input
                name="start1"
                required
                onChange={(e) => {
                  setStart1(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                End Latitude
              </label>
              <input
                name="end0"
                required
                onChange={(e) => {
                  setEnd0(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                End Longitude
              </label>
              <input
                name="end1"
                required
                onChange={(e) => {
                  setEnd1(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            {/* <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        End Longtitude
      </label>
      <inpu name="end1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  />
    </div> */}
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Range
              </label>
              <input
                name="range"
                required
                onChange={(e) => {
                  setRange(e.target.value);
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Start
            </button>
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div> */}
          {/* <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div> */}
          {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div> */}
          {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
    </div> */}
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default SatelliteInvestigation;
